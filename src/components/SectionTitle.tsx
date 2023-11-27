type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return <p className="text-3xl font-bold">{title}</p>;
}
