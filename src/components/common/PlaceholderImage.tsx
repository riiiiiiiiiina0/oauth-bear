import classNames from 'classnames';

export type PlaceholderImageType =
  | 'question'
  | 'raindrop-success'
  | 'raindrop-error';

const placeholderImages: Record<PlaceholderImageType, string> = {
  question: '/images/bear-question.png',
  'raindrop-success': '/images/raindrop-success.png',
  'raindrop-error': '/images/raindrop-error.png',
};

export function PlaceholderImage({
  type,
  className,
}: {
  type: PlaceholderImageType;
  className?: string;
}) {
  const image = placeholderImages[type];
  if (!image) return null;
  return <img src={image} className={classNames('size-80', className)} />;
}
