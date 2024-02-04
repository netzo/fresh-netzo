export const toInteger = (num: number) =>
  Math.round(Number(num)).toLocaleString("es-ES");

export const toFixed = (num: number) =>
  Number(num).toLocaleString("es-ES", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const toPercent = (num: number) =>
  Number(num).toLocaleString("es-ES", {
    style: "percent",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const toEuro = (num: number) =>
  Number(num).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const toMxn = (num: number) =>
  Number(num).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const toDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

export const toDateTime = (dateTime: string) =>
  new Date(dateTime).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
