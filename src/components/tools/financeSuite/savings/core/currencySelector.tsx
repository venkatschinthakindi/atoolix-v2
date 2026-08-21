import CustomSelect from "@/components/ui/customSelect";
import { CURRENCIES, CurrencyCode } from "./currencyCode";

export function CurrencySelector({
  value,
  onChange,
}: {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
}) {
  return (
    <div className="text-center space-y-2">
      <div className="sm:flex items-center justify-center gap-2 text-xs text-white/40">
        <span>Currency</span>

        <CustomSelect
          value={value}
          callBackTrigger={(e) =>
            onChange(e as CurrencyCode)
          }
          options={Object.entries(CURRENCIES).map(
            ([code, meta]) => ({
              value: code,
              label: meta.label,
            })
          )}
        />
      </div>

      <p className="text-[11px] text-white/35">
        Currency affects display only — no exchange-rate conversion is applied.
      </p>
    </div>
  );
}