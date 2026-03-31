export type FuelType = "Petrol" | "Diesel";

export interface FuelPriceRecord {
  city: string;
  fuelType: FuelType;
  year: number;
  month: number;
  rsp: number;
}
