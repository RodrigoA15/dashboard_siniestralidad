'use client'

import { useQuery } from "@tanstack/react-query"
import { useYear } from "@/context/YearContext"
import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic";
import { useFetchVehicleTypes } from "@/api/dashboard/fetchVehicleTypes";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const colors = ["#5A96E3", "#FFA33C", "#F46060", "#9DBC98"];

interface PropsData {
  TIPO: string,
  TOTAL_HERIDOS: number,
  TOTAL_MUERTOS: number,
  TOTAL: number
}

export const TotalVehiclesSeverities = () => {
  const { year } = useYear()
  const { totalVehiclesTypesSeverities } = useFetchVehicleTypes()
  const { data, isLoading } = useQuery({
    queryKey: ['total-accidentes-vehicles', year],
    queryFn: () => totalVehiclesTypesSeverities(year),
  })

  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 330
    },
    labels: data?.map((item: PropsData) => item.TIPO || 'SIN TIPO'),
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
      show: false
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

  const series = data?.map((item: PropsData) => item.TOTAL)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Tipo vehiculo - a&ntilde;o {year}
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Total siniestros
            </p>
          </div>
        </div>
        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          <div className="w-70">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={330}
            />
          </div>
          <div className="flex flex-col items-start gap-6 sm:flex-row xl:flex-col">
            {data?.map((item: PropsData) => (
              <div key={item.TIPO} className="flex items-start gap-2.5">
                <div className="mt-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: ["#5A96E3", "#FFA33C", "#F46060", "#9DBC98", "#5A96E3", "#FFA33C", "#F46060", "#9DBC98"][data.indexOf(item)] }}>
                </div>
                <div>
                  <h5 className="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {item.TIPO} - {item.TOTAL}
                  </h5>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                    <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                      {item.TOTAL_MUERTOS} Fallecidos
                    </p>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                      {item.TOTAL_HERIDOS} Heridos
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
