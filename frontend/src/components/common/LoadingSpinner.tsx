interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-6 w-6 border-2',
  md: 'h-12 w-12 border-2',
  lg: 'h-16 w-16 border-4',
};

export default function LoadingSpinner({
  size = 'md',
  message,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full border-cyan-400 border-t-transparent ${sizeClasses[size]}`}
      />
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {content}
      </div>
    );
  }

  return content;
}
