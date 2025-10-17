import classNames from 'classnames';

export type PlaceholderImageType = 'others' | 'success' | 'fail';

const getPlaceholderImageUrl = (
  type: PlaceholderImageType,
  context?: string,
) => {
  if (type !== 'others' && context) {
    return `/images/provider-${context}-${type}.jpeg`;
  }
  return `/images/${context}.jpeg`;
};

export function PlaceholderImage({
  context,
  type = 'others',
  className,
}: {
  context?: string;
  type?: PlaceholderImageType;
  className?: string;
}) {
  const image = getPlaceholderImageUrl(type, context);
  if (!image) return null;
  return (
    <img src={image} className={classNames('size-80 rounded-lg', className)} />
  );
}
