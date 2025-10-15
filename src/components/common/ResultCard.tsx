import classNames from 'classnames';

import { ClosePageButton } from './ClosePageButton';
import { GoHomeLink } from './GoHomeLink';

export function ResultCard({
  className,
  icon,
  title,
  message,
  type = 'success',
  showHomeLink = false,
  showCloseButton = false,
}: {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  type?: 'error' | 'success';
  showHomeLink?: boolean;
  showCloseButton?: boolean;
}) {
  return (
    <div
      className={classNames(
        'flex items-center justify-center min-h-screen',
        className,
      )}
    >
      <div className="card bg-base-100 w-96 shadow-xl">
        {icon && <figure className="pt-8">{icon}</figure>}
        <div className="card-body">
          {title && (
            <h2
              className={classNames('card-title justify-center', {
                'text-error': type === 'error',
                'text-success': type === 'success',
              })}
            >
              {title}
            </h2>
          )}
          {message && <p className="text-center">{message}</p>}
          {(showHomeLink || showCloseButton) && (
            <div className="card-actions justify-center mt-4">
              {showHomeLink && <GoHomeLink />}
              {showCloseButton && <ClosePageButton />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
