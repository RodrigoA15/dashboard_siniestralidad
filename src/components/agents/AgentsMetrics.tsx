'use client'

import { useQuery } from "@tanstack/react-query"
import { useAgentsFetch } from "@/api/dashboard/fetchAgents"

interface PropsActives {
    TOTAL: number
}
export const AgentsMetrics = () => {
    const { fetchAgentsActives } = useAgentsFetch()
    const { data, isError } = useQuery({
        queryKey: ['agents-actives'],
        queryFn: fetchAgentsActives,
        placeholderData: [{ TOTAL: 0 }]
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
        </div>
    )
}
