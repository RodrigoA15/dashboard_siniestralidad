"use client";
import React from "react";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useFetchTotals } from "@/api/dashboard/fetchTotals";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PropByYears {
  YEAR: number;
  TOTAL: number;
}

export default function StatisticsChart() {
  const {fetchTotalByYears, fetchAllYears} = useFetchTotals();

// Primera consulta
const { data: dataH, isLoading: loadingH } = useQuery({
  queryKey: ["totalByYears", "h"],
  queryFn: () => fetchTotalByYears("h")
});

// Segunda consulta
const { data: dataM, isLoading: loadingM } = useQuery({
  queryKey: ["totalByYears", "m"],
  queryFn: () => fetchTotalByYears("m")
});

const { data: dataAll, isLoading: loadingAll } = useQuery({
  queryKey: ["total-all-years"],
  queryFn: fetchAllYears
});

if (loadingH || loadingM || loadingAll) {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}

  const categories = dataH?.[0]?.total_accidents.map((item: PropByYears) => item.YEAR) || [];

  const options: ApexOptions = {
    legend: {
      show: true, // Hide legend
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5A96E3", "#FFA33C", "#F46060"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "straight", // Define the line style (straight, smooth, or step)
      width: 3, // Line width for each dataset
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },

    fill: {
      opacity: 1,
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      x: {
        format: "dd MMM yyyy", // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: categories, // Extract years for x-axis categories
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
  };

 const series = [
  {
    name: "Total",
    data: dataAll.map((item: PropByYears) => item.TOTAL) || [],
    type: "bar"
  },
  {
    name: "Heridos",
    data: dataH?.[0]?.total_accidents.map((item: PropByYears) => item.TOTAL) || []
  },
  {
    name: "Muertos",
    data: dataM?.[0]?.total_accidents.map((item: PropByYears) => item.TOTAL) || []
  },
  
];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Siniestros por a&ntilde;o
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you’ve set for each month
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
