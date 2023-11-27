export function fromMinutesToHours(time: number): string {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
}
