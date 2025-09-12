"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useFetchTotals } from "@/api/dashboard/fetchTotals";
import { useYear } from "@/context/YearContext";
import { meses } from "@/data/meses";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  TOTAL: number;
  MONTH: number;
}

export default function MonthlySalesChart() {
  const { fetchTotalMonths, fetchMonthSeverities } = useFetchTotals();
  const { year } = useYear();
  const { data, isLoading } = useQuery({
    queryKey: ["total-months", year],
    queryFn: () => fetchTotalMonths(year)
  })

  const { data: dataS, isLoading: loadingS } = useQuery({
    queryKey: ["month-severities", "h", year],
    queryFn: () => fetchMonthSeverities("h", year)
  });

  const { data: dataSM, isLoading: loadingSM } = useQuery({
    queryKey: ["month-severities", "m", year],
    queryFn: () => fetchMonthSeverities("m", year)
  });

  const options: ApexOptions = {
    colors: ["#5A96E3", "#FFA33C", "#F46060"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 220,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: "straight",
      width: 3,
    },
    xaxis: {
      categories: data?.map((item: Props) => meses[item.MONTH - 1]),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },

    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Total",
      type: "bar",
      data: data?.map((item: Props) => item.TOTAL),
    },

    {
      name: "Heridos",
      data: dataS?.map((item: Props) => item.TOTAL),
    },

    {
      name: "Muertos",
      data: dataSM?.map((item: Props) => item.TOTAL),
    }
  ];

  if (isLoading || loadingS || loadingSM) return <div className="flex items-center justify-center h-64"><p className="text-gray-500">Loading...</p></div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Siniestros por meses ({year})
        </h3>
      </div>

      <div className="max-w-full h-62 overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={220}
          />
        </div>
      </div>
    </div>
  );
}
