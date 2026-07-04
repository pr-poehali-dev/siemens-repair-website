import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-siemens-dark">
            SIEMENS
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-siemens hover:text-siemens-dark">
            <Icon name="ArrowLeft" size={18} />
            На главную
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-16">
        <h1 className="font-display text-3xl font-extrabold text-siemens-dark sm:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Дата последнего обновления: 30 июня 2026 г.
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">1. Общие положения</h2>
            <p className="mt-3">
              Настоящая Политика определяет порядок обработки персональных данных пользователей сайта
              сервисного центра по ремонту техники Siemens (далее — «Оператор») в соответствии с
              Федеральным законом № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">2. Какие данные мы собираем</h2>
            <p className="mt-3">
              Через форму заявки мы собираем: имя, номер телефона, модель техники и описание
              неисправности. Эти данные предоставляются вами добровольно при оформлении заявки на ремонт.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">3. Цели обработки</h2>
            <p className="mt-3">
              Персональные данные используются исключительно для обработки заявки, связи с вами по
              вопросу ремонта и согласования времени выезда мастера. Мы не передаём ваши данные третьим
              лицам и не используем их в рекламных целях без вашего согласия.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">4. Хранение и защита данных</h2>
            <p className="mt-3">
              Персональные данные, указанные в форме заявки, не сохраняются на серверах сайта и
              передаются напрямую на электронную почту Оператора, расположенную на территории
              Российской Федерации. Уведомления о новых заявках в мессенджеры отправляются в
              обезличенном виде — без имени, телефона и иных персональных данных.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">5. Ваши права</h2>
            <p className="mt-3">
              Вы вправе запросить информацию об обработке ваших персональных данных, их уточнение,
              блокирование или удаление, а также отозвать согласие на обработку, обратившись к нам по
              указанным на сайте контактам.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">6. Согласие</h2>
            <p className="mt-3">
              Отправляя форму заявки и проставляя соответствующую отметку, вы подтверждаете своё согласие
              на обработку персональных данных в соответствии с настоящей Политикой.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-siemens-dark py-6">
        <div className="container text-center text-xs text-white/50">
          © 2014 Сервисный центр Siemens.
        </div>
      </footer>
    </div>
  );
};

export default Privacy;