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
          Дата последнего обновления: 8 июля 2026 г.
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
            <p className="mt-3">
              Кроме того, при посещении сайта автоматически собираются обезличенные технические данные:
              IP-адрес, тип устройства и браузера, страницы визита, действия на сайте (клики, скроллинг,
              заполнение полей форм) и номер телефона, с которого совершён звонок по указанному на сайте
              телефонному номеру. Эти данные собираются с помощью сервисов, перечисленных в разделе 3.1.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">3. Цели обработки</h2>
            <p className="mt-3">
              Персональные данные используются исключительно для обработки заявки, связи с вами по
              вопросу ремонта и согласования времени выезда мастера. Обезличенные технические данные
              используются для аналитики посещаемости сайта, улучшения его работы, отслеживания
              эффективности рекламных каналов и обработки звонков и обращений в онлайн-чат. Мы не
              передаём ваши персональные данные третьим лицам и не используем их в рекламных целях без
              вашего согласия.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-siemens-dark">3.1. Сервисы аналитики и связи с посетителями</h2>
            <p className="mt-3">
              Для работы сайта мы используем следующие сторонние сервисы, которым передаются
              обезличенные технические данные о посещении сайта:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-siemens-dark">Яндекс.Метрика</span> — сервис веб-аналитики
                (оператор: ООО «Яндекс»), собирает данные о посещениях сайта, действиях пользователя, включая
                вебвизор и карту кликов, для анализа поведения посетителей;
              </li>
              <li>
                <span className="font-semibold text-siemens-dark">Botfaqtor</span> — сервис онлайн-чата на сайте,
                обрабатывает сообщения и данные, которые вы добровольно указываете при обращении в чат;
              </li>
              <li>
                <span className="font-semibold text-siemens-dark">Манго Телеком (MANGO OFFICE)</span> — сервис
                коллтрекинга, подменяет отображаемый номер телефона для определения источника звонка и
                обрабатывает данные о совершённых звонках (номер телефона звонящего, время и длительность
                звонка) в рекламно-аналитических целях.
              </li>
            </ul>
            <p className="mt-3">
              Обработка данных указанными сервисами осуществляется в соответствии с их собственными
              политиками конфиденциальности. Мы не передаём этим сервисам данные, указанные вами в форме
              заявки на ремонт (имя, телефон, описание неисправности).
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
            <p className="mt-3">
              Данные, собираемые сервисами Яндекс.Метрика, Botfaqtor и Манго Телеком, хранятся на серверах
              соответствующих операторов в течение сроков, установленных их политиками конфиденциальности.
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
              на обработку персональных данных в соответствии с настоящей Политикой. Продолжая пользоваться
              сайтом, вы также соглашаетесь на использование сервисов аналитики и связи, перечисленных
              в разделе 3.1.
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