import { useState } from "react";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "products", label: "Продукция" },
  { id: "calculator", label: "Калькуляторы" },
  { id: "portfolio", label: "Портфолио" },
  { id: "contacts", label: "Контакты" },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-graphite-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav("home")}>
          <img
            src="https://cdn.poehali.dev/projects/732face8-46cb-40af-8852-d60c125a1f83/bucket/90436faf-b820-49ac-b613-84698e0cb0a1.png"
            alt="ЗМП"
            className="h-10 w-auto object-contain"
          />
          <div className="text-orange text-xs leading-tight hidden sm:block">Производство металлоконструкций</div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                activeSection === item.id
                  ? "text-orange bg-orange/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+78001234567" className="text-orange font-semibold text-sm hover:text-orange/80 transition-colors">
            +7 (800) 123-45-67
          </a>
          <button
            onClick={() => handleNav("contacts")}
            className="bg-orange text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange/90 transition-colors"
          >
            Заказать
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-graphite-dark border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "text-orange bg-orange/10"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="tel:+78001234567"
            className="text-orange font-semibold text-sm px-3 py-2.5"
          >
            +7 (800) 123-45-67
          </a>
        </div>
      )}
    </header>
  );
}