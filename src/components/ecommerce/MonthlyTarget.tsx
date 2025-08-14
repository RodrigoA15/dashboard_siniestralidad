"use client";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useFetchTotals } from "@/api/dashboard/fetchTotals";
import { useYear } from "@/context/YearContext";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PropsData {
  TOTAL: number
  GRAVEDAD: string
}

export default function MonthlyTarget() {
  const {fetchPercentageSeverities} = useFetchTotals()
  const { year } = useYear()
  const {data, isLoading} = useQuery({
    queryKey: ["percentage-severities", year],
    queryFn: () => fetchPercentageSeverities(year),
  })

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 330
    },
    colors: ["#5A96E3", "#FFA33C", "#F46060"],
    labels: ["Heridos", "Muertos"],
    dataLabels: {
      enabled: true,
      style: {
          fontSize: '16px',
          colors: ['#000']
        },
        dropShadow: {
          enabled: false
        }
      },
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                fontSize: '22px',
                fontWeight: '#000000',
                color: '#465fff',
              }
            }
          }
        }
      }
  };

  const series = data?.map((item : PropsData) => item.TOTAL)

  if(isLoading) {
    return <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">Loading...</div>
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Siniestros por gravedad
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Total siniestros respecto al a&ntilde;o {year}
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={330}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
