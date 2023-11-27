import Image from "@app/components/Image";

type MoviePosterProps = {
  src: string | null;
  alt: string;
  className?: string;
};

export default function MoviePoster({ src, alt, className }: MoviePosterProps) {
  return (
    <div
      className={`overflow-hidden rounded shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <Image src={src} alt={alt} />
    </div>
  );
}
