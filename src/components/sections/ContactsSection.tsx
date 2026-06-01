import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  return (
    <section className="py-20 bg-graphite-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">Контакты</div>
          <h2 className="text-4xl font-bold text-white mb-4">Свяжитесь с нами</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col gap-6">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (800) 123-45-67", sub: "Звонок бесплатный" },
              { icon: "Mail", title: "Email", value: "info@metalstroy.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", title: "Адрес", value: "г. Москва, ул. Промышленная, 15", sub: "Пн–Пт 9:00–18:00" },
              { icon: "Clock", title: "Режим работы", value: "Пн–Пт: 9:00–18:00", sub: "Сб: 10:00–15:00" },
            ].map((contact) => (
              <div key={contact.title} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/10 border border-orange/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name={contact.icon} size={22} className="text-orange" fallback="Info" />
                </div>
                <div>
                  <div className="text-white/40 text-sm mb-0.5">{contact.title}</div>
                  <div className="text-white font-semibold">{contact.value}</div>
                  <div className="text-white/40 text-sm">{contact.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={36} className="text-orange" />
                </div>
                <h3 className="text-white text-xl font-semibold">Заявка отправлена!</h3>
                <p className="text-white/50">Менеджер свяжется с вами в течение 15 минут</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}
                  className="text-orange text-sm hover:underline"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-white text-xl font-semibold mb-2">Оставить заявку</h3>
                <div>
                  <label className="text-white/50 text-sm mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Петров"
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-sm mb-1.5 block">Номер телефона</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-sm mb-1.5 block">Сообщение (необязательно)</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Опишите ваш проект..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-orange transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange text-white py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={18} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </>
                  )}
                </button>
                <p className="text-white/30 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
