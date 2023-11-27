type DateFormatterOptions = Partial<
  {
    separator: string;
  } & Pick<Intl.DateTimeFormatOptions, "day" | "month" | "year">
>;

const defaultDateFormatterOptions: DateFormatterOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  separator: "/",
};

export default function dateFormatter(
  date: string,
  options: DateFormatterOptions = {},
): string {
  const d = new Date(date);
  const mergedOptions = { ...defaultDateFormatterOptions, ...options };

  const day = d.toLocaleString("default", { day: mergedOptions.day });
  const month = d.toLocaleString("default", { month: mergedOptions.month });
  const year = d.toLocaleString("default", { year: mergedOptions.year });

  const { separator } = mergedOptions;

  return [day, month, year].join(separator);
}
