import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORY_ICONS, getCategoryIcon } from "../utils/categoryIcons";

const CategoryIconPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const SelectedIcon = getCategoryIcon(value);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-100"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <SelectedIcon className="h-4 w-4" />
          </span>
          <span className="text-neutral-900">Change icon</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
          <div className="grid grid-cols-6 gap-1">
            {CATEGORY_ICONS.map(({ name, component: Icon }) => {
              const isSelected = name === value;
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`flex h-10 w-full items-center justify-center rounded-lg transition ${
                    isSelected
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryIconPicker;