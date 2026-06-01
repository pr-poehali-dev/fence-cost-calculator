import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-graphite-dark overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/32506d6e-67f0-42cf-afad-75dc3ab22748.png)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite-dark via-graphite-dark/90 to-graphite-dark/40" />

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-orange text-sm font-medium">Производство с 2005 года</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Металлоконструкции
            <br />
            <span className="text-orange">высшего качества</span>
          </h1>

          <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-xl">
            Заборы, ворота, калитки, навесы, сваи и доборные элементы.
            Современное оборудование и заказы любой сложности.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => onNavigate("calculator")}
              className="bg-orange text-white px-6 py-3 rounded font-semibold hover:bg-orange/90 transition-colors flex items-center gap-2"
            >
              <Icon name="Calculator" size={18} />
              Рассчитать стоимость
            </button>
            <button
              onClick={() => onNavigate("products")}
              className="border border-white/20 text-white px-6 py-3 rounded font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Icon name="Grid3x3" size={18} />
              Наша продукция
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg">
            {[
              { value: "20+", label: "лет опыта" },
              { value: "5000+", label: "объектов" },
              { value: "100%", label: "гарантия" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-orange">{stat.value}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white/30" />
      </div>
    </section>
  );
}
