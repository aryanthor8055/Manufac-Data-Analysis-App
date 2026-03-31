import type { FuelPriceRecord, FuelType } from "../types/fuel";

const EXPECTED_HEADERS = ["city", "fuelType", "year", "month", "rsp"];

function normalizeFuelType(value: string): FuelType {
  return value.trim().toLowerCase() === "diesel" ? "Diesel" : "Petrol";
}

function toNumberOrZero(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseFuelCsv(rawCsv: string): FuelPriceRecord[] {
  const lines = rawCsv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(",").map((header) => header.trim());
  const hasExpectedHeaders = EXPECTED_HEADERS.every(
    (header, index) => headers[index] === header,
  );

  if (!hasExpectedHeaders) {
    throw new Error("Invalid CSV headers.");
  }

  const records: FuelPriceRecord[] = [];

  for (let index = 1; index < lines.length; index += 1) {
    const cells = lines[index].split(",").map((cell) => cell.trim());
    if (cells.length < EXPECTED_HEADERS.length) {
      continue;
    }

    const year = Math.trunc(toNumberOrZero(cells[2]));
    const month = Math.trunc(toNumberOrZero(cells[3]));
    const rsp = toNumberOrZero(cells[4]);

    if (year <= 0 || month < 1 || month > 12) {
      continue;
    }

    records.push({
      city: cells[0],
      fuelType: normalizeFuelType(cells[1]),
      year,
      month,
      rsp,
    });
  }

  return records;
}
