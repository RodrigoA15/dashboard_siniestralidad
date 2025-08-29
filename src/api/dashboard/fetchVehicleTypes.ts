import { instance } from "@/lib/api"

export const useFetchVehicleTypes = () =>  {

    const totalVehicleType = async (year: string) => {
        const {data} = await instance.get('/vehicle-types/totals', {
            params: {
                year: year
            }
        })
        return data
    }

    const totalVehicleTypeByMonths = async (year: string) => {
        const {data} = await instance.get('/vehicle-types/months', {
            params: {
                year: year
            }
        })
        return data
    }

    const allVehiclesBySeverities = async(year: string) => {
        const {data} = await instance.get('/vehicle-types/all-severities',{
            params: {
                year: year
            }
        })
        return data
    }

    const totalVehiclesTypesSeverities = async(year: string) => {
        const {data} = await instance.get('/vehicle-types/total-severities', {
            params: {
                year: year
            }
        })
        return data
    }

    return {
        totalVehicleType,
        totalVehicleTypeByMonths,
        allVehiclesBySeverities,
        totalVehiclesTypesSeverities
    }
}