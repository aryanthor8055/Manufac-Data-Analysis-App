import { useMemo, useState } from "react";

import { Filters } from "./components/Filters";
import { MonthlyRspChart } from "./components/MonthlyRspChart";
import fuelCsvRaw from "./data/fuel_prices.csv?raw";
import type { FuelType } from "./types/fuel";
import {
  getDistinctCities,
  getDistinctYears,
  getMonthlyAverageRsp,
} from "./utils/analytics";
import { parseFuelCsv } from "./utils/csv";

export default function App() {
  const records = useMemo(() => parseFuelCsv(fuelCsvRaw), []);
  const cities = useMemo(() => getDistinctCities(records), [records]);
  const years = useMemo(() => getDistinctYears(records), [records]);

  const [selectedCity, setSelectedCity] = useState<string>(cities[0] ?? "");
  const [selectedFuel, setSelectedFuel] = useState<FuelType>("Petrol");
  const [selectedYear, setSelectedYear] = useState<number>(years[0] ?? 0);

  const monthlyAverageRsp = useMemo(
    () =>
      getMonthlyAverageRsp(records, {
        city: selectedCity,
        fuelType: selectedFuel,
        year: selectedYear,
      }),
    [records, selectedCity, selectedFuel, selectedYear],
  );

  return (
    <main className="app">
      <header>
        <h1>Fuel Price Analytics</h1>
      </header>

      <Filters
        cities={cities}
        years={years}
        selectedCity={selectedCity}
        selectedFuel={selectedFuel}
        selectedYear={selectedYear}
        onCityChange={setSelectedCity}
        onFuelChange={setSelectedFuel}
        onYearChange={setSelectedYear}
      />

      <MonthlyRspChart
        city={selectedCity}
        fuelType={selectedFuel}
        year={selectedYear}
        monthlyAverageRsp={monthlyAverageRsp}
      />
    </main>
  );
}
