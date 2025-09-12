"use client"

import { useQuery } from "@tanstack/react-query"
import { useYear } from "@/context/YearContext"
import { useFetchTypeServices } from "@/api/dashboard/fetchTypeService"

interface Props {
  DESC_SERVICIO: string,
  TOTAL: number
}
export const TypeServicesMetrics = () => {
  const { year } = useYear()
  const { accidentsByTypeServices } = useFetchTypeServices()
  const { data } = useQuery({
    queryKey: ["accidents-type-services", year],
    queryFn: () => accidentsByTypeServices(year),
    placeholderData: [{
      TOTAL: 0,
      DESC_SERVICIO: "Cargando..."
    }]
  })
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-6'>
      {data.map((item: Props) => (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]" key={item.DESC_SERVICIO}>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {item.DESC_SERVICIO || "Sin descripción"}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {item.TOTAL}
            </h4>
          </div>
        </div>
      ))}
    </div>
  )
}
