type MovieTitleProps = {
  title: string;
  description: string[];
};

export default function MovieTitle({ title, description }: MovieTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-3xl/9 font-bold">{title}</p>
      <p className="whitespace-pre-wrap text-lg md:hidden">
        {description.join("\n")}
      </p>
      <p className="hidden text-lg md:block">{description.join(" • ")}</p>
    </div>
  );
}
