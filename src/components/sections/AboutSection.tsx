import Icon from "@/components/ui/icon";

const advantages = [
  {
    icon: "Factory",
    title: "Собственное производство",
    desc: "Полный цикл от заготовки металла до готового изделия на современном оборудовании",
  },
  {
    icon: "ShieldCheck",
    title: "Гарантия качества",
    desc: "Каждое изделие проходит контроль качества. Гарантия на все виды продукции",
  },
  {
    icon: "Truck",
    title: "Доставка и монтаж",
    desc: "Доставляем по всему региону, профессиональный монтаж под ключ",
  },
  {
    icon: "Wrench",
    title: "Любая сложность",
    desc: "Выполняем заказы нестандартных форм и размеров по чертежам заказчика",
  },
  {
    icon: "Timer",
    title: "Точно в срок",
    desc: "Соблюдаем оговорённые сроки производства и доставки",
  },
  {
    icon: "HeadphonesIcon",
    title: "Поддержка 24/7",
    desc: "Менеджеры готовы проконсультировать в любое удобное время",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <div className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">О компании</div>
            <h2 className="text-4xl font-bold text-graphite-dark mb-6 leading-tight">
              Более 20 лет в производстве
              <br />
              <span className="text-orange">металлоконструкций</span>
            </h2>
            <p className="text-graphite-light text-lg leading-relaxed mb-6">
              Наша компания специализируется на производстве высококачественных металлических
              изделий для частных и коммерческих объектов. За годы работы мы накопили богатый
              опыт и выстроили надёжные процессы производства.
            </p>
            <p className="text-graphite-light leading-relaxed mb-8">
              Наши производственные мощности оснащены современным оборудованием ведущих мировых
              брендов, что позволяет нам выполнять заказы любой сложности с высокой точностью
              и в установленные сроки.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2005", label: "год основания" },
                { num: "5000+", label: "выполненных объектов" },
                { num: "50+", label: "сотрудников" },
                { num: "15", label: "единиц оборудования" },
              ].map((s) => (
                <div key={s.label} className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange">{s.num}</div>
                  <div className="text-graphite-light text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/0eb6c7b3-fd15-4e05-ade0-247235f54d6e.png"
                alt="Производство металлоконструкций"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-orange text-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold">20+</div>
              <div className="text-white/80 text-sm">лет на рынке</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="border border-border rounded-xl p-6 hover:border-orange/40 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
                <Icon name={adv.icon} size={24} className="text-orange" fallback="Star" />
              </div>
              <h3 className="text-graphite-dark font-semibold text-lg mb-2">{adv.title}</h3>
              <p className="text-graphite-light text-sm leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}