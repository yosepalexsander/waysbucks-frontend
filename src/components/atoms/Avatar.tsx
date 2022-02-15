import Image from 'next/image';
import type { ImgHTMLAttributes } from 'react';
import { memo } from 'react';

type Props = ImgHTMLAttributes<HTMLDivElement>;

export const Avatar = memo(function Avatar({ src, alt, width, height, children, ...props }: Props) {
  return (
    <>
      <div className="img-container avatar" style={{ width: width, height: height }} {...props}>
        {src ? (
          <Image src={src} alt={alt} layout="fill" objectFit="cover" className="rounded-full" />
        ) : (
          <p>{children}</p>
        )}
      </div>
    </>
  );
});
