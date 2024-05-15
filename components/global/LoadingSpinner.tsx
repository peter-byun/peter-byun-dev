import Image from 'next/image';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

const IMAGE_SIZES = {
  sm: 100,
  md: 150,
  lg: 200,
} as const;

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { size = 'sm' } = props;

  const imageSize = IMAGE_SIZES[size];

  return (
    <Image
      src="/assets/icons/loading-spinner.svg"
      layout="fixed"
      alt="loading-spinner"
      width={imageSize}
      height={imageSize}
    />
  );
};
