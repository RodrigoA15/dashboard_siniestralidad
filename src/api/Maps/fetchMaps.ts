import { instance } from "@/lib/api";

export const useFetchMaps = () => {

    const accidentsByDate = async(start_date: string, end_date: string, severity : string) => {
        const {data} = await instance.get("/accidents", {
            params: {
                start_date: start_date,
                end_date: end_date,
                severity: severity
            }
        });
        return data;
    }

    const accidentsByCommunity = async(year: string) => {
        const {data} = await instance.get("/accidents/communities", {
            params: {
                year: year
            }
        });
        return data;
    }

    return {
        accidentsByDate, accidentsByCommunity
    }
}