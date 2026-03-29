import { UI_TEXT } from '../../constants/text';
import StyledSelect from './StyledSelect';

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
    <StyledSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      wrapperClassName={className}
    >
      <option value="all">{allLabel}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
}
