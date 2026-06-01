import Icon from "@/components/ui/icon";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function FooterSection({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black/90 border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => onNavigate("home")}>
              <div className="w-9 h-9 bg-orange rounded flex items-center justify-center">
                <Icon name="Layers" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-base">МеталлСтрой</div>
                <div className="text-orange text-xs">Производство металлоконструкций</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Более 20 лет производим высококачественные металлоконструкции.
              Современное оборудование, опытная команда, точно в срок.
            </p>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Разделы</div>
            <div className="flex flex-col gap-2">
              {[
                { id: "about", label: "О компании" },
                { id: "products", label: "Продукция" },
                { id: "calculator", label: "Калькуляторы" },
                { id: "portfolio", label: "Портфолио" },
                { id: "contacts", label: "Контакты" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-white/40 text-sm hover:text-orange text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Контакты</div>
            <div className="flex flex-col gap-3">
              <a href="tel:+78001234567" className="flex items-center gap-2 text-white/40 text-sm hover:text-orange transition-colors">
                <Icon name="Phone" size={14} />
                +7 (800) 123-45-67
              </a>
              <a href="mailto:info@metalstroy.ru" className="flex items-center gap-2 text-white/40 text-sm hover:text-orange transition-colors">
                <Icon name="Mail" size={14} />
                info@metalstroy.ru
              </a>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Icon name="MapPin" size={14} />
                г. Москва, ул. Промышленная, 15
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/25 text-sm">
            © 2024 МеталлСтрой. Все права защищены.
          </div>
          <div className="text-white/25 text-sm">
            Производство металлоконструкций с 2005 года
          </div>
        </div>
      </div>
    </footer>
  );
}
