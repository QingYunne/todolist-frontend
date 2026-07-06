import dayjs from "~/config/dayjs"

export function formatRelativeDate(date: string) {
  const d = dayjs(date);

  if (dayjs().diff(d, "day") >= 30) {
    return d.format("MMM D, YYYY");
  }

  return d.fromNow();
}

export function toFieldErrors(
  errors: { field: string; message: string }[]
): Record<string, string> {
  return errors.reduce((acc, error) => {
    acc[error.field] = error.message
    return acc
  }, {} as Record<string, string>)
}