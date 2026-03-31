import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { MONTH_LABELS } from "../constants/months";
import type { FuelType } from "../types/fuel";

interface MonthlyRspChartProps {
  city: string;
  fuelType: FuelType;
  year: number;
  monthlyAverageRsp: number[];
}

export function MonthlyRspChart({
  city,
  fuelType,
  year,
  monthlyAverageRsp,
}: MonthlyRspChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption({
      title: {
        text: `Monthly Average RSP - ${fuelType} (${city}, ${year})`,
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: 40,
        right: 20,
        bottom: 40,
        top: 60,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: MONTH_LABELS,
      },
      yAxis: {
        type: "value",
        name: "RSP",
      },
      series: [
        {
          type: "bar",
          data: monthlyAverageRsp,
          itemStyle: {
            color: fuelType === "Petrol" ? "#ff7a45" : "#4f8cff",
          },
          barWidth: "50%",
        },
      ],
    });

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [city, fuelType, monthlyAverageRsp, year]);

  return <div className="chart" ref={chartRef} />;
}
