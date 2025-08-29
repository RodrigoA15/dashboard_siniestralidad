'use client'

import { useQuery } from "@tanstack/react-query"
import { useFetchVehicleTypes } from "@/api/dashboard/fetchVehicleTypes"
import { useYear } from "@/context/YearContext"
import { CalenderIcon, CarIcon, GroupIcon } from "@/icons"

interface PropsData {
    TOTAL: number
    TIPO: string
}

export const VehiclesTypeMetrics = () => {
    const {year} = useYear()
    const {totalVehicleType} = useFetchVehicleTypes()
    const {data, isLoading} = useQuery({
        queryKey: ['total-vehicle-type', year],
        queryFn: () => totalVehicleType(year),
        placeholderData: [0]
    })

    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }

    const validationIcons = (item: PropsData) => {
        if(item.TIPO === 'PEATONES'){
            return <GroupIcon />
        }else if(item.TIPO === 'AUTOMOVILES'){
            return <CarIcon />
        }else {
            return <CalenderIcon />
        }
    }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {data.map((item: PropsData) => (
      <div key={item.TIPO} className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
        {validationIcons(item)}
        </div>
        <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white/90">{item.TOTAL}</h3>
        <p className="flex items-center gap-3 text-gray-500 dark:text-gray-400">{item.TIPO}</p>
        </div>
      </div>
        ))}
    </div>
  )
}
