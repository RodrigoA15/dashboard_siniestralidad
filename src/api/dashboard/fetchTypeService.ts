import { instance } from "@/lib/api"

export const useFetchTypeServices = () =>  {

    const accidentsByTypeServices = async(year: string) => {
        const {data} = await instance.get('/type-services/years', {
            params: {
                year: year
            }
        })
        return data
    }

    const typeServicesByMonths = async(year: string) => {
        const {data} = await instance.get('/type-services/months', {
            params: {
                year: year
            }
        })
        return data
    }

    const typeServicesCompanies = async(year: string) => {
        const {data} = await instance.get('/type-services/companies', {
            params: {
                year: year
            }
        })
        return data
    }

    return {
        accidentsByTypeServices, typeServicesByMonths, typeServicesCompanies
    }
}