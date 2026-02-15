import type { ReactNode } from 'react';

interface CardProps {
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  image,
  imageAlt = '',
  title,
  subtitle,
  children,
  onClick,
  className = '',
}: CardProps) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden text-left transition-all hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        {title && <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 mb-3">{subtitle}</p>}
        {children}
      </div>
    </Wrapper>
  );
}
