type CardProps = {
  imgSrc: string;
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
    <div className="col-span-2 flex flex-col gap-2 bg-white">
      <img
        className="rounded border border-[#e7e7e7]"
        src={imgSrc}
        alt={imgAlt}
      />
      <div>
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm font-bold uppercase text-[#646464]">
          {description}
        </p>
      </div>
    </div>
  );
}
