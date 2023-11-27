import Image from "./Image";

type CastProfileProps = {
  imgSrc: string | null;
  name: string;
  description: string;
};

export default function CastProfile({
  imgSrc,
  name,
  description,
}: CastProfileProps) {
  return (
    <div className="flex min-w-[191px] max-w-[191px] flex-col gap-4 p-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <Image src={imgSrc} alt={name} />
      <p className="text-lg font-bold">{name}</p>
      <p className="text-base">{description}</p>
    </div>
  );
}
