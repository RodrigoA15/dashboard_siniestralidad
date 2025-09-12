import { intancesPredictions } from "@/lib/api";


interface Props {
    coordenadaX: string;
    coordenadaY: string;
}
export const usePredictions = () => {
    const fetchAllPredictions = async (dataApi: []) => {
            const dataSeverityData = dataApi.map((item: Props) => {
            return {
                longitud: item.coordenadaX,
                latitud: item.coordenadaY,
            }
        })
        const {data} = await intancesPredictions.post("/allSeverity", {
            data: dataSeverityData,
            quantity: 2
        });

        return data
    }

        const fetchCriticalAreas = async (dataApi: []) => {
        const dataSeverityData = dataApi.map((item: Props) => {
            return {
                longitud: item.coordenadaX,
                latitud: item.coordenadaY,
            }
        })
        const {data} = await intancesPredictions.post("/critical-areas", {
            data: dataSeverityData,
            quantity: 2
        });

        return data
    }

    return {
        fetchAllPredictions, fetchCriticalAreas
    }
}