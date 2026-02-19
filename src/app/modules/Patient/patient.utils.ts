import { isValid, parse } from "date-fns";

export const convertToDateTime = (dateStr: string | undefined) => {
  if (!dateStr) return undefined;

  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  if (!isValid(date)) return undefined;

  return date;
};
