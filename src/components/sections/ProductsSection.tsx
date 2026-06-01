import Icon from "@/components/ui/icon";

const products = [
  {
    title: "Металлический евроштакетник",
    desc: "Современное ограждение из металлического профиля. Различные профили, цвета и высоты по RAL-каталогу.",
    image: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/f8840956-cb9e-42dc-8518-2ba1148abb15.png",
    tags: ["Заборы", "Ограждения"],
    icon: "Fence",
  },
  {
    title: "Ворота и калитки",
    desc: "Распашные и откатные ворота, калитки — сварные конструкции с антикоррозийным покрытием.",
    image: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/32506d6e-67f0-42cf-afad-75dc3ab22748.png",
    tags: ["Ворота", "Калитки"],
    icon: "DoorOpen",
  },
  {
    title: "Навесы",
    desc: "Навесы различных форм и размеров: арочные, односкатные, двускатные. Для авто, террасы, входной группы.",
    image: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/98837d43-5fd0-4480-86b0-e1de55cb9fd9.png",
    tags: ["Навесы", "Козырьки"],
    icon: "Home",
  },
  {
    title: "Доборные элементы",
    desc: "Планки, угловые, торцевые и соединительные элементы для завершённого вида ограждений.",
    image: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/0eb6c7b3-fd15-4e05-ade0-247235f54d6e.png",
    tags: ["Комплектующие"],
    icon: "Layers",
  },
  {
    title: "Сваи и оголовки",
    desc: "Винтовые и забивные сваи, декоративные оголовки. Надёжное основание для заборов и строений.",
    image: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/0eb6c7b3-fd15-4e05-ade0-247235f54d6e.png",
    tags: ["Фундамент", "Сваи"],
    icon: "ArrowDown",
  },
  {
    title: "Фасонные элементы",
    desc: "Коньки, отливы, ендовы, карнизные планки — производство по стандартным и индивидуальным размерам.",
    image: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/0eb6c7b3-fd15-4e05-ade0-247235f54d6e.png",
    tags: ["Кровля", "Фасонные"],
    icon: "Triangle",
  },
];

export default function ProductsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">Продукция</div>
          <h2 className="text-4xl font-bold text-graphite-dark mb-4">
            Что мы производим
          </h2>
          <p className="text-graphite-light text-lg max-w-xl mx-auto">
            Полный ассортимент металлических изделий для частного строительства и коммерческих объектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg hover:border-orange/30 transition-all group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-orange text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={product.icon} size={18} className="text-orange" fallback="Star" />
                  </div>
                  <h3 className="text-graphite-dark font-semibold text-lg leading-snug">{product.title}</h3>
                </div>
                <p className="text-graphite-light text-sm leading-relaxed">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
