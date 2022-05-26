import Image from 'next/image';
import type { ImgHTMLAttributes } from 'react';
import { memo } from 'react';

type Props = ImgHTMLAttributes<HTMLDivElement>;

const sizeMap = new Map<string, object>([
  ['sm', { width: 40, height: 40 }],
  ['md', { width: 80, height: 80 }],
  ['lg', { width: 160, height: 160 }],
  ['xl', { width: 240, height: 240 }],
]);

export const Avatar = memo(({ src, alt, sizes, children, ...props }: Props) => {
  const size = sizeMap.get(sizes ?? 'sm');

  return (
    <>
      <div className="img-container avatar" style={{ ...size }} {...props}>
        {src ? <Image src={src} alt={alt} layout="fill" objectFit="cover" className="rounded-full" /> : children}
      </div>
    </>
  );
});
