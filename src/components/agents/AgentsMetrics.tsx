'use client'

import { useQuery } from "@tanstack/react-query"
import { useAgentsFetch } from "@/api/dashboard/fetchAgents"
import { useYear } from "@/context/YearContext"

interface PropsActives {
    TOTAL: number
}

interface PropsTop {
    TOTAL_ACCIDENTES: number,
    NOMBRES: string,
    APELLIDOS: string
}
export const AgentsMetrics = () => {
    const { year } = useYear()
    const { fetchAgentsActives, fetchAgentsTop, fetchAgentsTopSeverity } = useAgentsFetch()
    const { data, isError } = useQuery({
        queryKey: ['agents-actives'],
        queryFn: fetchAgentsActives,
        placeholderData: [{ TOTAL: 0 }]
    })

    const { data: dataTop, isError: isErrorTop } = useQuery({
        queryKey: ['agents-top', year],
        queryFn: () => fetchAgentsTop(year),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    const { data: dataTopSeverityH, isError: isErrorTopSeverityH } = useQuery({
        queryKey: ['agents-top-severity', year, "h"],
        queryFn: () => fetchAgentsTopSeverity(year, "h"),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    const { data: dataTopSeverityM, isError: isErrorTopSeverityM } = useQuery({
        queryKey: ['agents-top-severity-deads', year, "m"],
        queryFn: () => fetchAgentsTopSeverity(year, "m"),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                {data.map((item: PropsActives) => (
                    <h4 key={item.TOTAL} className="text-title-sm font-bold text-gray-800 dark:text-white/90">{item.TOTAL || isError}</h4>
                ))}
                <div className="mt-4 flex items-end justify-between sm:mt-5">
                    <div>
                        <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                            Agentes Activos
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                {dataTop.map((item: PropsTop) => (
                    <div key={item.TOTAL_ACCIDENTES}>
                        <h4 className="text-title-sm font-bold text-gray-800 dark:text-white/90">{item.TOTAL_ACCIDENTES || isErrorTop}</h4>
                        <div className="mt-4 flex items-end  sm:mt-5">
                            <div>
                                <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                                    Agente con m&aacute;s sinisestros atendidos
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                                    {item.NOMBRES} {item.APELLIDOS}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                {dataTopSeverityH.map((item: PropsTop) => (
                    <div key={item.TOTAL_ACCIDENTES}>
                        <h4 className="text-title-sm font-bold text-gray-800 dark:text-white/90">{item.TOTAL_ACCIDENTES || isErrorTopSeverityH}</h4>
                        <div className="mt-4 flex items-end  sm:mt-5">
                            <div>
                                <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                                    Agente con m&aacute;s heridos atendidos
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                                    {item.NOMBRES} {item.APELLIDOS}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                {dataTopSeverityM.map((item: PropsTop) => (
                    <div key={item.TOTAL_ACCIDENTES}>
                        <h4 className="text-title-sm font-bold text-gray-800 dark:text-white/90">{item.TOTAL_ACCIDENTES || isErrorTopSeverityM}</h4>
                        <div className="mt-4 flex items-end  sm:mt-5">
                            <div>
                                <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                                    Agente con m&aacute;s fallecidos atendidos
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                                    {item.NOMBRES} {item.APELLIDOS}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
