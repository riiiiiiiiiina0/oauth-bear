import classNames from 'classnames';
import { GoHomeLink } from './GoHomeLink';

export function ResultCard({
  className,
  icon,
  title,
  message,
  type = 'success',
}: {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  type?: 'error' | 'success';
}) {
  return (
    <div
      className={classNames(
        'flex items-center justify-center min-h-screen',
        className,
      )}
    >
      <div className="text-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          {icon && <div className="mb-4">{icon}</div>}
          {title && (
            <h1
              className={classNames('text-2xl font-bold mb-4', {
                'text-red-600': type === 'error',
                'text-green-600': type === 'success',
              })}
            >
              {title}
            </h1>
          )}
          {message && <p>{message}</p>}
        </div>
        <GoHomeLink />
      </div>
    </div>
  );
}
