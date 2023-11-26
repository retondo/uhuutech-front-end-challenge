import Image from "./Image";

type CardProps = {
  imgSrc: string | null;
  imgAlt: string;
  title: string;
  description: string;
};

export default function Card({
  imgSrc,
  imgAlt,
  title,
  description,
}: CardProps) {
  return (
    <div className="flex flex-col gap-2 bg-white">
      <div className="min-h-[264px] overflow-hidden rounded border border-[#e7e7e7]">
        <Image src={imgSrc} alt={imgAlt} />
      </div>
      <div>
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm font-bold uppercase text-[#646464]">
          {description}
        </p>
      </div>
    </div>
  );
}
