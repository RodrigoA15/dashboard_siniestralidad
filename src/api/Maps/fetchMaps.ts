import { instance } from "@/lib/api";

export const useFetchMaps = () => {

    const accidentsByDate = async(start_date: Date, end_date: Date, severity : string) => {
        const {data} = await instance.get("/accidents", {
            params: {
                start_date: start_date.toISOString(),
                end_date: end_date.toISOString(),
                severity: severity
            }
        });
        return data;
    }

    return {
        accidentsByDate
    }
}