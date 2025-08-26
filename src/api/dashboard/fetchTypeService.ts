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

    const topCompanies = async() => {
        const {data} = await instance.get('/type-services/top-companies')
        return data
    }

    const totalAccidentesByServices = async() => {
        const {data} = await instance.get('/type-services/totals')
        return data
    }

        const totalYearAccidentesByServices = async(year: string) => {
        const {data} = await instance.get('/type-services/total-years', {
            params: {
                year: year
            }
        })
        return data
    }

    return {
        accidentsByTypeServices, typeServicesByMonths, typeServicesCompanies, topCompanies, totalAccidentesByServices, totalYearAccidentesByServices
    }
}