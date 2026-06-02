import { useState } from "react";
import Icon from "@/components/ui/icon";

type CalcType = "fence" | "fasad";

// ---- Fence calculator ----
const fenceTypes = [
  { id: "euroshtaketnik", label: "Евроштакетник", pricePerM: 1800 },
  { id: "proflist", label: "Профлист", pricePerM: 1400 },
  { id: "svarnoj", label: "Сварной забор", pricePerM: 2500 },
  { id: "kovanyj", label: "Кованый забор", pricePerM: 5500 },
];

const fenceColors = [
  { id: "ral8017", label: "RAL 8017 (Шоколад)", hex: "#4A2C1A" },
  { id: "ral7016", label: "RAL 7016 (Антрацит)", hex: "#383E42" },
  { id: "ral6005", label: "RAL 6005 (Зелёный мох)", hex: "#2F4538" },
  { id: "ral3003", label: "RAL 3003 (Рубин)", hex: "#8D1D2C" },
  { id: "ral9003", label: "RAL 9003 (Белый)", hex: "#F4F4F4" },
];

const installOptions = [
  { id: "self", label: "Самовывоз (без монтажа)", coeff: 1.0 },
  { id: "delivery", label: "Доставка", coeff: 1.1 },
  { id: "full", label: "Доставка + монтаж", coeff: 1.35 },
];

// ---- Fasad elements calculator ----
const fasadItems = [
  { id: "konek", label: "Конёк кровельный", unit: "пог. м", price: 420 },
  { id: "otliv", label: "Отлив оконный", unit: "пог. м", price: 380 },
  { id: "endova", label: "Ендова", unit: "пог. м", price: 560 },
  { id: "karniznaya", label: "Карнизная планка", unit: "пог. м", price: 290 },
  { id: "fartuk", label: "Фартук примыкания", unit: "пог. м", price: 340 },
  { id: "uglovaya", label: "Угловая планка", unit: "пог. м", price: 310 },
  { id: "tortsevaya", label: "Торцевая планка", unit: "пог. м", price: 270 },
  { id: "planka_j", label: "J-планка", unit: "пог. м", price: 220 },
];

function FenceCalculator({ onOrder }: { onOrder: (data: object) => void }) {
  const [length, setLength] = useState(20);
  const [height, setHeight] = useState(1.8);
  const [fenceType, setFenceType] = useState(fenceTypes[0].id);
  const [color, setColor] = useState(fenceColors[0].id);
  const [install, setInstall] = useState(installOptions[0].id);
  const [gate, setGate] = useState(false);
  const [wicket, setWicket] = useState(false);

  const selectedType = fenceTypes.find((t) => t.id === fenceType)!;
  const selectedInstall = installOptions.find((i) => i.id === install)!;

  const baseCost = length * selectedType.pricePerM * (height / 1.8);
  const gateCost = gate ? 35000 : 0;
  const wicketCost = wicket ? 12000 : 0;
  const total = Math.round((baseCost + gateCost + wicketCost) * selectedInstall.coeff);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-graphite-dark text-sm font-medium mb-1.5 block">
            Длина забора: <span className="text-orange">{length} м</span>
          </label>
          <input
            type="range" min={5} max={200} value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-orange"
          />
          <div className="flex justify-between text-xs text-graphite-light mt-1">
            <span>5 м</span><span>200 м</span>
          </div>
        </div>
        <div>
          <label className="text-graphite-dark text-sm font-medium mb-1.5 block">
            Высота: <span className="text-orange">{height.toFixed(1)} м</span>
          </label>
          <input
            type="range" min={1.0} max={3.0} step={0.1} value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-orange"
          />
          <div className="flex justify-between text-xs text-graphite-light mt-1">
            <span>1.0 м</span><span>3.0 м</span>
          </div>
        </div>
      </div>

      <div>
        <label className="text-graphite-dark text-sm font-medium mb-2 block">Тип забора</label>
        <div className="grid grid-cols-2 gap-2">
          {fenceTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setFenceType(t.id)}
              className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                fenceType === t.id
                  ? "border-orange bg-orange/5 text-graphite-dark font-medium"
                  : "border-border text-graphite-light hover:border-orange/40"
              }`}
            >
              <div>{t.label}</div>
              <div className="text-xs text-graphite-light mt-0.5">от {t.pricePerM.toLocaleString()} ₽/м</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-graphite-dark text-sm font-medium mb-2 block">Цвет (RAL)</label>
        <div className="flex flex-wrap gap-2">
          {fenceColors.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.id)}
              title={c.label}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                color === c.id ? "border-orange scale-110 shadow-md" : "border-white/50 hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="flex items-center text-sm text-graphite-light ml-1">
            {fenceColors.find((c2) => c2.id === color)?.label}
          </span>
        </div>
      </div>

      <div>
        <label className="text-graphite-dark text-sm font-medium mb-2 block">Монтаж</label>
        <div className="flex flex-col gap-2">
          {installOptions.map((opt) => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                install === opt.id ? "border-orange bg-orange" : "border-border group-hover:border-orange/50"
              }`} onClick={() => setInstall(opt.id)}>
                {install === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm text-graphite-dark" onClick={() => setInstall(opt.id)}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-graphite-dark text-sm font-medium mb-2 block">Дополнительно</label>
        <div className="flex flex-col gap-2">
          {[
            { key: "gate", label: "Откатные ворота", price: 35000, val: gate, set: setGate },
            { key: "wicket", label: "Калитка", price: 12000, val: wicket, set: setWicket },
          ].map((opt) => (
            <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  opt.val ? "border-orange bg-orange" : "border-border group-hover:border-orange/50"
                }`}
                onClick={() => opt.set(!opt.val)}
              >
                {opt.val && <Icon name="Check" size={10} className="text-white" />}
              </div>
              <span className="text-sm text-graphite-dark" onClick={() => opt.set(!opt.val)}>
                {opt.label} <span className="text-graphite-light">+{opt.price.toLocaleString()} ₽</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-graphite-dark rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/60 text-sm">Основная конструкция ({length} м)</span>
          <span className="text-white text-sm">{Math.round(baseCost).toLocaleString()} ₽</span>
        </div>
        {gate && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/60 text-sm">Откатные ворота</span>
            <span className="text-white text-sm">35 000 ₽</span>
          </div>
        )}
        {wicket && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/60 text-sm">Калитка</span>
            <span className="text-white text-sm">12 000 ₽</span>
          </div>
        )}
        {selectedInstall.id !== "self" && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/60 text-sm">{selectedInstall.label}</span>
            <span className="text-white text-sm">×{selectedInstall.coeff}</span>
          </div>
        )}
        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-white font-semibold">Итого</span>
          <span className="text-orange text-2xl font-bold">{total.toLocaleString()} ₽</span>
        </div>
        <p className="text-white/30 text-xs mt-2">* Ориентировочная стоимость. Точная цена — после замера.</p>
      </div>

      <button
        onClick={() => onOrder({
          type: "fence",
          fenceType: selectedType.label,
          length,
          height,
          color: fenceColors.find((c) => c.id === color)?.label,
          install: selectedInstall.label,
          gate,
          wicket,
          total,
        })}
        className="bg-orange text-white py-3.5 rounded-xl font-semibold hover:bg-orange/90 transition-colors flex items-center justify-center gap-2 text-base"
      >
        <Icon name="Send" size={18} />
        Отправить расчёт менеджеру
      </button>
    </div>
  );
}

function FasadCalculator({ onOrder }: { onOrder: (data: object) => void }) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(fasadItems.map((i) => [i.id, 0]))
  );
  const [thickness, setThickness] = useState<"0.4" | "0.5" | "0.7">("0.5");
  const [color, setColor] = useState(fenceColors[0].id);

  const thicknessCoeff: Record<string, number> = { "0.4": 0.85, "0.5": 1.0, "0.7": 1.3 };

  const total = Math.round(
    fasadItems.reduce((sum, item) => {
      return sum + item.price * (quantities[item.id] || 0) * thicknessCoeff[thickness];
    }, 0)
  );

  const hasItems = Object.values(quantities).some((q) => q > 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-graphite-dark text-sm font-medium mb-2 block">Толщина металла</label>
        <div className="flex gap-2">
          {(["0.4", "0.5", "0.7"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setThickness(t)}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                thickness === t
                  ? "border-orange bg-orange text-white"
                  : "border-border text-graphite-light hover:border-orange/40"
              }`}
            >
              {t} мм
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-graphite-dark text-sm font-medium mb-2 block">Цвет (RAL)</label>
        <div className="flex flex-wrap gap-2">
          {fenceColors.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.id)}
              title={c.label}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                color === c.id ? "border-orange scale-110 shadow-md" : "border-white/50 hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="flex items-center text-sm text-graphite-light ml-1">
            {fenceColors.find((c2) => c2.id === color)?.label}
          </span>
        </div>
      </div>

      <div>
        <label className="text-graphite-dark text-sm font-medium mb-3 block">Выберите элементы и укажите количество</label>
        <div className="flex flex-col gap-3">
          {fasadItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-graphite-dark text-sm font-medium">{item.label}</div>
                <div className="text-graphite-light text-xs">
                  {Math.round(item.price * thicknessCoeff[thickness]).toLocaleString()} ₽ / {item.unit}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantities((q) => ({ ...q, [item.id]: Math.max(0, (q[item.id] || 0) - 1) }))}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-graphite-light hover:border-orange hover:text-orange transition-colors"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <div className="w-10 text-center text-graphite-dark font-semibold text-sm">{quantities[item.id] || 0}</div>
                <button
                  onClick={() => setQuantities((q) => ({ ...q, [item.id]: (q[item.id] || 0) + 1 }))}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-graphite-light hover:border-orange hover:text-orange transition-colors"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-graphite-dark rounded-xl p-5">
        {hasItems ? (
          <>
            {fasadItems.filter((i) => quantities[i.id] > 0).map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-sm">{item.label} × {quantities[item.id]} {item.unit}</span>
                <span className="text-white text-sm">
                  {Math.round(item.price * quantities[item.id] * thicknessCoeff[thickness]).toLocaleString()} ₽
                </span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center">
              <span className="text-white font-semibold">Итого</span>
              <span className="text-orange text-2xl font-bold">{total.toLocaleString()} ₽</span>
            </div>
          </>
        ) : (
          <div className="text-center text-white/30 py-3 text-sm">
            Добавьте элементы для расчёта стоимости
          </div>
        )}
        <p className="text-white/30 text-xs mt-2">* Ориентировочная стоимость. Точная цена — после замера.</p>
      </div>

      <button
        disabled={!hasItems}
        onClick={() => onOrder({
          type: "fasad",
          thickness,
          color: fenceColors.find((c) => c.id === color)?.label,
          items: fasadItems
            .filter((i) => quantities[i.id] > 0)
            .map((i) => ({ name: i.label, qty: quantities[i.id], unit: i.unit })),
          total,
        })}
        className="bg-orange text-white py-3.5 rounded-xl font-semibold hover:bg-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
      >
        <Icon name="Send" size={18} />
        Отправить расчёт менеджеру
      </button>
    </div>
  );
}

interface OrderModalProps {
  data: object;
  onClose: () => void;
  onSuccess: () => void;
}

function OrderModal({ data, onClose, onSuccess }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const func2url = await import("../../../backend/func2url.json");
      const url = (func2url as Record<string, string>)["send-order"];
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, orderData: data }),
      });
    } catch (_e) {
      console.error(_e);
    }
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-graphite-light hover:text-graphite-dark">
          <Icon name="X" size={20} />
        </button>
        <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
          <Icon name="Calculator" size={24} className="text-orange" />
        </div>
        <h3 className="text-graphite-dark text-xl font-bold mb-2">Отправить расчёт</h3>
        <p className="text-graphite-light text-sm mb-6">
          Введите контактные данные, и менеджер свяжется с вами для уточнения деталей
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-graphite-dark text-sm font-medium mb-1.5 block">Ваше имя</label>
            <input
              required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Иван Петров"
              className="w-full border border-border rounded-lg px-4 py-3 text-graphite-dark placeholder:text-graphite-light/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <div>
            <label className="text-graphite-dark text-sm font-medium mb-1.5 block">Номер телефона</label>
            <input
              required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="w-full border border-border rounded-lg px-4 py-3 text-graphite-dark placeholder:text-graphite-light/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="bg-orange text-white py-3 rounded-xl font-semibold hover:bg-orange/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <><Icon name="Loader2" size={18} className="animate-spin" />Отправляем...</> : <><Icon name="Send" size={18} />Отправить заявку</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CalculatorSection() {
  const [activeCalc, setActiveCalc] = useState<CalcType>("fence");
  const [orderData, setOrderData] = useState<object | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">Калькуляторы</div>
          <h2 className="text-4xl font-bold text-graphite-dark mb-4">Рассчитайте стоимость</h2>
          <p className="text-graphite-light text-lg max-w-xl mx-auto">
            Получите ориентировочную стоимость вашего заказа онлайн и отправьте расчёт менеджеру
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-white rounded-xl p-1.5 border border-border mb-6 shadow-sm">
            <button
              onClick={() => setActiveCalc("fence")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeCalc === "fence"
                  ? "bg-orange text-white shadow"
                  : "text-graphite-light hover:text-graphite-dark"
              }`}
            >
              <Icon name="Fence" size={16} fallback="Square" />
              Калькулятор заборов
            </button>
            <button
              onClick={() => setActiveCalc("fasad")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeCalc === "fasad"
                  ? "bg-orange text-white shadow"
                  : "text-graphite-light hover:text-graphite-dark"
              }`}
            >
              <Icon name="Layers" size={16} />
              Фасонные элементы
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            {activeCalc === "fence" ? (
              <FenceCalculator onOrder={(d) => setOrderData(d)} />
            ) : (
              <FasadCalculator onOrder={(d) => setOrderData(d)} />
            )}
          </div>
        </div>
      </div>

      {orderData && !success && (
        <OrderModal
          data={orderData}
          onClose={() => setOrderData(null)}
          onSuccess={() => { setOrderData(null); setSuccess(true); }}
        />
      )}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSuccess(false)}>
          <div className="bg-white rounded-2xl p-10 text-center max-w-sm shadow-2xl">
            <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={36} className="text-orange" />
            </div>
            <h3 className="text-graphite-dark text-xl font-bold mb-2">Расчёт отправлен!</h3>
            <p className="text-graphite-light text-sm">Менеджер свяжется с вами в течение 15 минут для уточнения деталей</p>
          </div>
        </div>
      )}
    </section>
  );
}