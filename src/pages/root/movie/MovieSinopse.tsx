type MovieSinopseProps = {
  sinopse: string;
  fallback: string;
};

export default function MovieSinopse({ sinopse, fallback }: MovieSinopseProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-bold">Sinopse</p>
      <p className="text-base text-[#ddd]">{sinopse ?? fallback}</p>
    </div>
  );
}
