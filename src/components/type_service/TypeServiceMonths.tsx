"use client"
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useFetchTypeServices } from "@/api/dashboard/fetchTypeService";
import { useYear } from "@/context/YearContext";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface TypeServiceData {
  TOTAL: number;
  MONTH: number;
  DESC_SERVICIO: string;
}

export const TypeServiceMonths = () => {
  const { typeServicesByMonths } = useFetchTypeServices();
  const { year } = useYear();

  const { data = [], isLoading } = useQuery<TypeServiceData[]>({
    queryKey: ["typeServicesMonths", year],
    queryFn: () => typeServicesByMonths(year),
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Cargando...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No hay datos disponibles
      </div>
    );
  }

  const uniqueMonths = [...new Set(data.map((item) => item.MONTH))].sort(
    (a, b) => a - b
  );
  const uniqueServices = [
    ...new Set(data.map((item) => item.DESC_SERVICIO || "No especificado")),
  ];

  // Construcción de series limpia
  const series = uniqueServices.map((service) => ({
    name: service,
    data: uniqueMonths.map(
      (month) =>
        data.find(
          (d) => d.MONTH === month && (d.DESC_SERVICIO || "No especificado") === service
        )?.TOTAL || 0
    ),
  }));

  const options: ApexOptions = {
    colors: ["#34699A", '#5A96E3', "#67C090", "#BF9200"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
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
      categories: uniqueMonths.map((m) => `Mes ${m}`),
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

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Siniestros por meses tipo servicio a&ntilde;o ({year})
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
          <div style={{ minHeight: "365px" }}>
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
