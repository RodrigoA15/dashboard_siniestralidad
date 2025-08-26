'use client'

import { useQuery } from "@tanstack/react-query"
import { useFetchTypeServices } from "@/api/dashboard/fetchTypeService"
import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const colors=  ["#5A96E3", "#FFA33C", "#F46060", "#9DBC98"];

interface PropsData {
  DESC_SERVICIO: string,
  TOTAL_HERIDOS: number,
  TOTAL_MUERTOS: number,
  TOTAL: number
}
export const TotalAccidentsInjured = () => {
      const {totalAccidentesByServices} = useFetchTypeServices()
        const {data, isLoading} = useQuery({
            queryKey: ['totalAccidentesByServices'],
            queryFn: totalAccidentesByServices,
        })
    
          const options: ApexOptions = {
            colors,
            chart: {
              fontFamily: "Outfit, sans-serif",
              type: "donut",
              height: 330
            },
            labels: data?.map((item: PropsData) => item.DESC_SERVICIO || 'SIN RAZON SOCIAL'),
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
    
      const series = data?.map((item : PropsData) => item.TOTAL_HERIDOS)
    
        if(isLoading) {
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
              Heridos por tipo servicio
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

          <div className="flex flex-col gap-4">
            {data.map((item : PropsData) => {
              return (
                <div key={item.DESC_SERVICIO} className="flex items-center gap-2">
                    <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ["#5A96E3", "#FFA33C", "#F46060", "#9DBC98", "#5A96E3", "#FFA33C", "#F46060", "#9DBC98"][data.indexOf(item)] }}
                  ></span>
                  <span className="text-gray-500 text-theme-sm dark:text-gray-400">{item.DESC_SERVICIO || 'SIN DESCRIPCION'}:</span>
                  <span className="ml-auto text-gray-400">
                    {item.TOTAL_HERIDOS} casos
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
