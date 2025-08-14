import { instance } from "@/lib/api"

export const useFetchTotals = () => {
  
    const fetchTotals = async () => {
        const {data} = await instance.get('/accidents/totals')
        return data
    }

    const fetchTotalYears = async (year: string) => {
        const {data} = await instance.get('/accidents/total-years', {
            params: {
                year: year
            }
        })
        return data
    }

        const fetchAllYears = async () => {
        const {data} = await instance.get('/accidents/all-years')
        return data
    }

    const fetchTotalMonths = async(year: string) => {
        const {data} = await instance.get('/accidents/total-months', {
            params: {
                year: year
            }
        })
        return data
    }

    const fetchPercentageSeverities = async(year: string) => {
        const {data} = await instance.get('/accidents/percentage-severities', {
            params: {
                year: year
            }
        })
        return data
    }

    const fetchTotalByYears = async (severity: string) => {
        const {data} = await instance.get('/accidents/years', {
            params: {
                severity: severity
            }
        })
        return data
    }

    const fetchRecentAccidents = async () => {
        const {data} = await instance.get('/accidents/latest')
        return data
    }

    const fetchMonthSeverities = async(severity: string, year: string) => {
        const {data} = await instance.get('/accidents/month-severities', {
            params: {
                severity: severity,
                year: year
            }
        })
        return data
    }
    return {fetchTotals, fetchTotalYears, fetchTotalMonths, fetchPercentageSeverities, fetchTotalByYears, fetchRecentAccidents, fetchMonthSeverities, fetchAllYears}
}