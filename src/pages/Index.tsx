import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SUBMIT_URL = 'https://functions.poehali.dev/b16b35fe-8e61-417a-b0ea-c00eda3edfa3';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/6737e19d-4ad6-4e45-999c-e2ac4aa0d438/files/81f896dc-1100-4eb9-9b72-e14a6972389c.jpg';

const navLinks = [
  { label: 'Главная', href: '#' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'О компании', href: '#about' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const services = [
  { icon: 'WashingMachine', title: 'Стиральные машины', desc: 'Не сливает, не крутит, шумит, ошибки на дисплее и др. — устраним за один визит.', price: 'от 1 200 ₽' },
  { icon: 'Utensils', title: 'Посудомоечные машины', desc: 'Не моет, не набирает воду, течёт. Чистка, замена ТЭНа, насосов и др.', price: 'от 1 400 ₽' },
  { icon: 'CookingPot', title: 'Духовые шкафы', desc: 'Не греет, не держит температуру, не работает гриль, подсветка и др.', price: 'от 1 500 ₽' },
  { icon: 'Refrigerator', title: 'Холодильники', desc: 'Не морозит, обмерзает, гудит. Заправка фреоном, замена компрессора и др.', price: 'от 1 600 ₽' },
  { icon: 'Microwave', title: 'Варочные панели', desc: 'Индукционные и электрические: не включается, мигают индикаторы и др.', price: 'от 1 300 ₽' },
  { icon: 'Wind', title: 'Вытяжки и сушки', desc: 'Шум, вибрация, не работает мотор, подсветка и др. Диагностика бесплатно.', price: 'от 1 100 ₽' },
];

const advantages = [
  { icon: 'Clock', title: 'Выезд в день обращения', desc: 'Мастер приедет в удобное время уже сегодня' },
  { icon: 'ShieldCheck', title: 'Гарантия до 2 лет', desc: 'На работу и установленные запчасти' },
  { icon: 'Cog', title: 'Оригинальные запчасти', desc: 'Только качественные комплектующие Siemens' },
  { icon: 'Wallet', title: 'Честная цена', desc: 'Озвучим стоимость до начала ремонта' },
];

const steps = [
  { num: '01', title: 'Оставляете заявку', desc: 'По телефону или через форму на сайте' },
  { num: '02', title: 'Согласуем время', desc: 'Мастер приедет в удобный для вас интервал' },
  { num: '03', title: 'Диагностика', desc: 'Бесплатно при последующем ремонте' },
  { num: '04', title: 'Ремонт и гарантия', desc: 'Чинит на месте и выдаёт гарантийный талон' },
];

const portfolio = [
  { model: 'Siemens iQ500 WM14', issue: 'Замена подшипников и сальника', time: '90 минут' },
  { model: 'Siemens iQ300 SN23', issue: 'Чистка и замена циркуляционного насоса', time: '60 минут' },
  { model: 'Siemens HB634GBS1', issue: 'Замена нагревательного элемента', time: '45 минут' },
  { model: 'Siemens KG39NXX', issue: 'Заправка фреоном, ремонт системы No Frost', time: '120 минут' },
  { model: 'Siemens EX875LX', issue: 'Восстановление сенсорной панели управления', time: '70 минут' },
  { model: 'Siemens iQ700 WM6', issue: 'Замена модуля управления, прошивка', time: '80 минут' },
];

const reviews = [
  { name: 'Анна К.', text: 'Стиралка перестала отжимать вечером — мастер приехал на следующее утро, починил за час. Всё прозрачно по цене.', rating: 5 },
  { name: 'Дмитрий В.', text: 'Духовка Siemens перестала держать температуру. Привезли оригинальный ТЭН, поставили, дали гарантию 2 года. Рекомендую.', rating: 5 },
  { name: 'Марина С.', text: 'Посудомойка текла снизу. Диагностику сделали бесплатно, всё объяснили. Аккуратные, вежливые ребята.', rating: 5 },
];

const faq = [
  { q: 'Сколько стоит выезд мастера?', a: 'Выезд и диагностика бесплатны при последующем ремонте. Стоимость работ озвучиваем до начала — никаких скрытых платежей.' },
  { q: 'Вы используете оригинальные запчасти?', a: 'Да, мы работаем только с оригинальными и качественными комплектующими Siemens. На все детали распространяется гарантия.' },
  { q: 'Как быстро приедет мастер?', a: 'В большинстве случаев мы выезжаем в день обращения. Точное время согласуем по телефону сразу после заявки.' },
  { q: 'Какая гарантия на ремонт?', a: 'Мы даём гарантию до 2 лет на выполненные работы и установленные запчасти с гарантийным талоном.' },
  { q: 'Ремонтируете технику на дому?', a: 'Да, более 90% поломок устраняем прямо у вас дома. Сложные случаи решаем в сервисном центре с бесплатной доставкой.' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', appliance: '', message: '' });
  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent: true }),
      });
      if (!res.ok) throw new Error('fail');
      toast({ title: 'Заявка отправлена!', description: 'Перезвоним в течение 5 минут.' });
      setForm({ name: '', phone: '', appliance: '', message: '' });
    } catch {
      toast({
        title: 'Не удалось отправить',
        description: 'Позвоните нам: 8 800 123-45-67',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-siemens-dark">
              SIEMENS
            </span>
            <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
              · сервис ремонта
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-siemens"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden text-right md:block">
              <span className="block text-xs text-muted-foreground">Звоните сейчас</span>
              <span className="block font-display text-base font-bold text-siemens-dark">
                8 800 123-45-67
              </span>
            </a>
            <Button asChild className="hidden bg-siemens font-semibold hover:bg-siemens-dark sm:inline-flex">
              <a href="#contacts">Вызвать мастера</a>
            </Button>
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="container flex flex-col py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm font-medium text-foreground/80 hover:text-siemens"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 siemens-gradient opacity-[0.04]" />
        <div className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-siemens-light px-4 py-1.5 text-sm font-semibold text-siemens-dark">
              <Icon name="BadgeCheck" size={16} />
              Центральный сервис
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-siemens-dark text-balance sm:text-5xl lg:text-6xl">
              Ремонт техники Siemens с гарантией до 2 лет
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Стиральные и посудомоечные машины, духовые шкафы, холодильники.
              Выезд мастера в день обращения, оригинальные запчасти, честные цены.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-siemens text-base font-semibold hover:bg-siemens-dark">
                <a href="#contacts">
                  <Icon name="Wrench" size={20} className="mr-1" />
                  Вызвать мастера
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-siemens text-base font-semibold text-siemens-dark hover:bg-siemens-light">
                <a href="tel:+78001234567">8 800 123-45-67</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { n: '12 000+', t: 'ремонтов' },
                { n: '9:00–22:00', t: 'без выходных' },
              ].map((s) => (
                <div key={s.t}>
                  <div className="font-display text-3xl font-extrabold text-siemens">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] siemens-gradient opacity-10 blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Мастер ремонтирует технику Siemens"
              className="aspect-square w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-5 shadow-xl ring-1 ring-border sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siemens-light">
                  <Icon name="ShieldCheck" size={24} className="text-siemens" />
                </div>
                <div>
                  <div className="font-display font-bold text-siemens-dark">Гарантия 2 года</div>
                  <div className="text-sm text-muted-foreground">на работы и детали</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div key={a.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-siemens text-white">
                <Icon name={a.icon} size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-siemens-dark">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-siemens">Услуги</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-siemens-dark sm:text-4xl">
            Ремонтируем только технику Siemens
          </h2>
          <p className="mt-4 text-muted-foreground">
            Диагностика бесплатно при ремонте. Чиним на дому в день обращения.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="hover-lift group rounded-2xl border border-border bg-card p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-siemens-light text-siemens transition-colors group-hover:bg-siemens group-hover:text-white">
                <Icon name={s.icon} size={28} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-siemens-dark">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-display font-bold text-siemens">{s.price}</span>
                <a href="#contacts" className="flex items-center gap-1 text-sm font-semibold text-siemens-dark transition-colors hover:text-siemens">
                  Заказать <Icon name="ArrowRight" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="siemens-gradient">
        <div className="container py-20 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-white/70">Как мы работаем</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Четыре шага до исправной техники
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="relative rounded-2xl bg-white/10 p-7 backdrop-blur-sm">
                <div className="font-display text-5xl font-extrabold text-white/30">{s.num}</div>
                <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-siemens">Портфолио</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-siemens-dark sm:text-4xl">
            Недавние работы
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p) => (
            <div key={p.model} className="hover-lift rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-siemens">
                <Icon name="CircleCheckBig" size={18} />
                <span className="text-xs font-bold uppercase tracking-wide">Выполнено</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-siemens-dark">{p.model}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.issue}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} className="text-siemens" />
                Время ремонта: {p.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-border bg-secondary/40">
        <div className="container grid items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-siemens">О компании</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-siemens-dark sm:text-4xl">
              Сервисный центр Siemens с 2014 года
            </h2>
            <p className="mt-5 text-muted-foreground">
              Мы специализируемся исключительно на технике Siemens. За 12 лет работы наши инженеры
              выполнили более 12 000 ремонтов и знают каждую модель досконально — от старых линеек
              до новейших серий iQ700 и StudioLine.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { icon: 'Users', t: 'Сертифицированные мастера' },
                { icon: 'Truck', t: 'Своя служба доставки запчастей' },
                { icon: 'FileCheck', t: 'Официальный договор и чек' },
                { icon: 'Star', t: 'Рейтинг 4.9 из 5' },
              ].map((i) => (
                <div key={i.t} className="flex items-center gap-3">
                  <Icon name={i.icon} size={22} className="text-siemens" />
                  <span className="text-sm font-medium">{i.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { n: '12 лет', t: 'на рынке' },
              { n: '12 000+', t: 'ремонтов' },
              { n: '90%', t: 'чиним на дому' },
              { n: '2 года', t: 'гарантии' },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl bg-card p-7 text-center shadow-sm ring-1 ring-border">
                <div className="font-display text-4xl font-extrabold text-siemens">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-siemens">Отзывы</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-siemens-dark sm:text-4xl">
            Что говорят наши клиенты
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-7">
              <div className="flex gap-1 text-siemens">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Icon key={i} name="Star" size={18} className="fill-siemens" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">«{r.text}»</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-siemens-light font-display font-bold text-siemens-dark">
                  {r.name[0]}
                </div>
                <span className="font-display font-bold text-siemens-dark">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-siemens">FAQ</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-siemens-dark sm:text-4xl">
              Частые вопросы
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-bold text-siemens-dark hover:text-siemens">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts / CTA */}
      <section id="contacts" className="siemens-gradient">
        <div className="container grid gap-12 py-20 lg:grid-cols-2">
          <div className="text-white">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Оставьте заявку — перезвоним за 5 минут
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              Опишите проблему, и мастер приедет в удобное время уже сегодня.
              Диагностика бесплатна при ремонте.
            </p>
            <div className="mt-10 space-y-5">
              {[
                { icon: 'Phone', t: '8 800 123-45-67', s: 'Бесплатно по России' },
                { icon: 'Mail', t: 'service@siemens-repair.ru', s: 'Ответим в течение часа' },
                { icon: 'MapPin', t: 'Москва, ул. Примерная, 12', s: 'Ежедневно 8:00 – 22:00' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div>
                    <div className="font-display font-bold">{c.t}</div>
                    <div className="text-sm text-white/70">{c.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-background p-8 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-siemens-dark">Вызвать мастера</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
              <Input
                placeholder="Телефон"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              <Input
                placeholder="Модель техники (необязательно)"
                value={form.appliance}
                onChange={(e) => updateField('appliance', e.target.value)}
              />
              <Textarea
                placeholder="Опишите неисправность"
                rows={3}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-siemens text-base font-semibold hover:bg-siemens-dark"
              >
                {loading ? 'Отправляем…' : 'Отправить заявку'}
              </Button>
              <p className="text-xs leading-snug text-muted-foreground">
                Нажимая на кнопку, вы даёте согласие на обработку персональных данных и принимаете{' '}
                <Link to="/privacy" className="text-siemens underline hover:text-siemens-dark">
                  политику конфиденциальности
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-siemens-dark text-white/80">
        <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-2xl font-extrabold text-white">SIEMENS</span>
            <p className="mt-3 text-sm">
              Независимый сервисный центр по ремонту бытовой техники Siemens.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white">Услуги</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {services.slice(0, 4).map((s) => (
                <li key={s.title}><a href="#services" className="hover:text-white">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white">Компания</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">О нас</a></li>
              <li><a href="#portfolio" className="hover:text-white">Портфолио</a></li>
              <li><a href="#reviews" className="hover:text-white">Отзывы</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white">Контакты</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>8 800 123-45-67</li>
              <li>service@siemens-repair.ru</li>
              <li>Москва, ул. Примерная, 12</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container flex flex-col items-center justify-center gap-2 py-6 text-center text-xs text-white/50 sm:flex-row sm:gap-4">
            <span>© 2026 Сервисный центр Siemens. Не является официальным представителем Siemens AG.</span>
            <Link to="/privacy" className="underline hover:text-white">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;