import type { FuelPriceRecord, FuelType } from "../types/fuel";

export interface FiltersState {
  city: string;
  fuelType: FuelType;
  year: number;
}

export function getDistinctCities(records: FuelPriceRecord[]): string[] {
  return [...new Set(records.map((record) => record.city))].sort();
}

export function getDistinctYears(records: FuelPriceRecord[]): number[] {
  return [...new Set(records.map((record) => record.year))].sort((a, b) => a - b);
}

export function getMonthlyAverageRsp(
  records: FuelPriceRecord[],
  filters: FiltersState,
): number[] {
  const monthTotals = new Array<number>(12).fill(0);
  const monthCounts = new Array<number>(12).fill(0);

  records.forEach((record) => {
    if (
      record.city === filters.city &&
      record.fuelType === filters.fuelType &&
      record.year === filters.year
    ) {
      const monthIndex = record.month - 1;
      monthTotals[monthIndex] += record.rsp;
      monthCounts[monthIndex] += 1;
    }
  });

  return monthTotals.map((total, index) => {
    if (monthCounts[index] === 0) {
      return 0;
    }

    return Number((total / monthCounts[index]).toFixed(2));
  });
}
