import json
import os
import smtplib
import ssl
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.header import Header
from datetime import datetime

import psycopg2


def send_email(req_id: int, name: str, phone: str, appliance: str, message: str) -> None:
    host = os.environ['SMTP_HOST']
    port = int(os.environ.get('SMTP_PORT', '465'))
    user = os.environ['SMTP_USER']
    password = os.environ['SMTP_PASSWORD']
    mail_to = os.environ['MAIL_TO']

    body = (
        f"Новая заявка с сайта №{req_id}\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Техника: {appliance or '—'}\n"
        f"Неисправность: {message or '—'}\n\n"
        f"Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
    )

    msg = MIMEText(body, 'plain', 'utf-8')
    msg['Subject'] = Header(f'Заявка с сайта №{req_id} — ремонт Siemens', 'utf-8')
    msg['From'] = user
    msg['To'] = mail_to

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(host, port, context=context) as server:
        server.login(user, password)
        server.sendmail(user, [mail_to], msg.as_string())


def send_telegram(req_id: int, appliance: str) -> None:
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if not token or not chat_id:
        return

    appliance_text = appliance if appliance else 'техника не указана'
    text = (
        f"🔔 Новая заявка №{req_id}\n"
        f"Тип: {appliance_text}\n"
        f"Время: {datetime.now().strftime('%H:%M')}\n\n"
        f"Личные данные клиента отправлены на почту."
    )

    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(url, data=data)
    urllib.request.urlopen(req, timeout=10)


def handler(event, context):
    '''Принимает заявку с формы ремонта Siemens: сохраняет в БД, отправляет полные данные на почту (РФ) и обезличенное уведомление в Telegram.'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    appliance = (body.get('appliance') or '').strip()
    message = (body.get('message') or '').strip()
    consent = bool(body.get('consent'))

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите имя и телефон'}),
        }

    if not consent:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Необходимо согласие на обработку персональных данных'}),
        }

    db_schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {db_schema}.requests (name, phone, appliance, message, consent) "
            f"VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (name, phone, appliance, message, consent),
        )
        req_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
    finally:
        conn.close()

    send_email(req_id, name, phone, appliance, message)
    send_telegram(req_id, appliance)

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'id': req_id}),
        'isBase64Encoded': False,
    }