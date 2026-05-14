import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface StyledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
}

const StyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ className = '', wrapperClassName = '', children, disabled, ...props }, ref) => {
    return (
      <div className={`relative ${wrapperClassName}`}>
        <select
          ref={ref}
          disabled={disabled}
          className={`appearance-none p-4 rounded-lg bg-gray-100 outline-none w-full text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:bg-white transition-all pr-10 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
        </div>
      </div>
    );
  }
);

StyledSelect.displayName = 'StyledSelect';
export default StyledSelect;