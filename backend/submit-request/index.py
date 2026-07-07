import json
import os
import smtplib
import ssl
import time
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.header import Header
from datetime import datetime


def send_email(req_id: str, name: str, phone: str, appliance: str, message: str) -> None:
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


def send_telegram_to_chat(token: str, chat_id: str, text: str) -> None:
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
    last_error = None
    for _ in range(3):
        try:
            req = urllib.request.Request(url, data=data)
            with urllib.request.urlopen(req, timeout=8) as resp:
                resp.read()
            return
        except Exception as e:
            last_error = e
    if last_error:
        raise last_error


def send_telegram(req_id: str, appliance: str) -> list:
    '''Рассылает уведомление во все настроенные Telegram-чаты независимо друг от друга.
    Возвращает список ошибок (по одной на неудачный чат), не прерывая отправку остальным.'''
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_ids = [
        c for c in [
            os.environ.get('TELEGRAM_CHAT_ID'),
            os.environ.get('TELEGRAM_CHAT_ID_2'),
        ] if c
    ]
    if not token or not chat_ids:
        return []

    appliance_text = appliance if appliance else 'техника не указана'
    text = (
        f"🔔 Новая заявка №{req_id}\n"
        f"Тип: {appliance_text}\n"
        f"Время: {datetime.now().strftime('%H:%M')}\n\n"
        f"Личные данные клиента отправлены на почту."
    )

    errors = []
    for chat_id in chat_ids:
        try:
            send_telegram_to_chat(token, chat_id, text)
        except Exception as e:
            errors.append(f'chat_id={chat_id}: {e}')
    return errors


def handler(event, context):
    '''Принимает заявку с формы ремонта Siemens: отправляет полные данные напрямую на почту (РФ) и обезличенное уведомление в Telegram. Персональные данные нигде не сохраняются — ни в базе данных, ни на диске.'''
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

    # Номер заявки формируем на лету по времени запроса — данные никуда не сохраняются
    req_id = str(int(time.time()))[-6:]

    email_sent = True
    try:
        send_email(req_id, name, phone, appliance, message)
    except Exception:
        email_sent = False

    try:
        telegram_errors = send_telegram(req_id, appliance)
        for err in telegram_errors:
            print(f'Telegram send failed: {err}')
    except Exception as e:
        print(f'Telegram send failed: {e}')

    if not email_sent:
        return {
            'statusCode': 502,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Не удалось отправить заявку, попробуйте позже'}),
        }

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'id': req_id}),
        'isBase64Encoded': False,
    }