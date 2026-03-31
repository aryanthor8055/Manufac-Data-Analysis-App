import type { FuelType } from "../types/fuel";

interface FiltersProps {
  cities: string[];
  years: number[];
  selectedCity: string;
  selectedFuel: FuelType;
  selectedYear: number;
  onCityChange: (value: string) => void;
  onFuelChange: (value: FuelType) => void;
  onYearChange: (value: number) => void;
}

export function Filters({
  cities,
  years,
  selectedCity,
  selectedFuel,
  selectedYear,
  onCityChange,
  onFuelChange,
  onYearChange,
}: FiltersProps) {
  return (
    <section className="filters">
      <label className="field">
        <span>Metro City</span>
        <select
          value={selectedCity}
          onChange={(event) => onCityChange(event.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Fuel Type</span>
        <select
          value={selectedFuel}
          onChange={(event) => onFuelChange(event.target.value as FuelType)}
        >
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
      </label>

      <label className="field">
        <span>Calendar Year</span>
        <select
          value={selectedYear}
          onChange={(event) => onYearChange(Number(event.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
