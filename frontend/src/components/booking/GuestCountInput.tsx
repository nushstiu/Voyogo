interface GuestCountInputProps {
  label: string;
  subtitle?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const GuestCountInput = ({ label, subtitle, value, min, max, onChange }: GuestCountInputProps) => {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <span className="font-medium text-gray-800">{label}</span>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
          }}
          className="w-10 text-center font-medium bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default GuestCountInput;