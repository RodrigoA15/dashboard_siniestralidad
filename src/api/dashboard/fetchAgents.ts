import { instance } from "@/lib/api"


export const useAgentsFetch = () => {

    const fetchAgentsActives = async() => {
        const {data} = await instance.get('/agents/actives')
        return data
    }

    const fetchTopAgents = async(year: string) => {
        const {data} = await instance.get('/agents/top-accidents', {
            params: {
                year: year
            }
        })
        return data
    }

    const fetchAgentsTop = async(year: string) => {
        const {data} = await instance.get('/agents/top', {
            params: {
                year: year
            }
        })
        return data
    }

        const fetchAgentsTopSeverity = async(year: string, severity: string) => {
        const {data} = await instance.get('/agents/top-severities', {
            params: {
                year: year,
                severity: severity
            }
        })
        return data
    }

    return {
        fetchAgentsActives,
        fetchTopAgents,
        fetchAgentsTop,
        fetchAgentsTopSeverity
    }
}