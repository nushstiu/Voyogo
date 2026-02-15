import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_TEXT } from '../../constants/text';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = UI_TEXT.SEARCH_PLACEHOLDER,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-4 rounded bg-gray-100 outline-none w-full pl-10 pr-10 text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} className="text-sm" />
        </button>
      )}
    </div>
  );
}
