import { UI_TEXT } from '../../constants/text';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  allLabel?: string;
  className?: string;
}

export default function FilterDropdown({
  value,
  onChange,
  options,
  allLabel = UI_TEXT.FILTER_ALL,
  className = '',
}: FilterDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-4 rounded bg-gray-100 outline-none w-full text-sm cursor-pointer ${className}`}
    >
      <option value="all">{allLabel}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
