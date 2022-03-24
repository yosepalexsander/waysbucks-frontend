import Image from 'next/image';
import type { ImgHTMLAttributes } from 'react';
import { memo } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export const CardMedia = memo(({ src, alt, height }: Props) => {
  return (
    <div className="img-container relative" style={{ width: '100%', height: height }}>
      {src && <Image src={src} alt={alt} layout="fill" objectFit="cover" className="rounded-md" />}
    </div>
  );
});
