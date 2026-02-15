import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface EmptyStateProps {
  icon?: IconDefinition;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = faInbox,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FontAwesomeIcon icon={icon} className="text-gray-300 text-4xl mb-4" />
      <p className="text-gray-900 font-semibold mb-1">{title}</p>
      {description && <p className="text-gray-500 text-sm">{description}</p>}
    </div>
  );
}
