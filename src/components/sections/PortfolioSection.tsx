import { useState } from "react";

const photos = [
  {
    src: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/f8840956-cb9e-42dc-8518-2ba1148abb15.png",
    title: "Забор из евроштакетника",
    category: "Заборы",
  },
  {
    src: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/32506d6e-67f0-42cf-afad-75dc3ab22748.png",
    title: "Откатные ворота",
    category: "Ворота",
  },
  {
    src: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/98837d43-5fd0-4480-86b0-e1de55cb9fd9.png",
    title: "Двускатный навес с воротами",
    category: "Навесы",
  },
  {
    src: "https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/0eb6c7b3-fd15-4e05-ade0-247235f54d6e.png",
    title: "Доборные элементы",
    category: "Доборные",
  },
];

const categories = ["Все", "Заборы", "Ворота", "Навесы", "Доборные"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "Все"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">Портфолио</div>
          <h2 className="text-4xl font-bold text-graphite-dark mb-4">Наши работы</h2>
          <p className="text-graphite-light text-lg max-w-xl mx-auto">
            Реализованные проекты различной сложности для частных и коммерческих клиентов
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-orange text-white"
                  : "bg-muted text-graphite-light hover:bg-orange/10 hover:text-orange"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((photo) => (
            <div
              key={photo.src}
              className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/5]"
              onClick={() => setLightbox(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <div className="text-orange text-xs font-medium mb-1">{photo.category}</div>
                  <div className="text-white font-semibold">{photo.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <img
              src={lightbox}
              alt="Просмотр"
              className="max-w-full max-h-full rounded-xl object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
