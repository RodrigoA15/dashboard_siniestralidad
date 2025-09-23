'use client'

import { useAgentsFetch } from "@/api/dashboard/fetchAgents"
import { useYear } from "@/context/YearContext"
import { UserCircleIcon } from "@/icons"
import { useQuery } from "@tanstack/react-query"

interface PropsTop {
    TOTAL_ACCIDENTES: number,
    NOMBRES: string,
    APELLIDOS: string
}

export const TopActivities = () => {
    const { year } = useYear()
    const { fetchAgentsTop, fetchAgentsTopSeverity, fetchAlcoholLevels } = useAgentsFetch()

    const { data: dataTop } = useQuery({
        queryKey: ['agents-top', year],
        queryFn: () => fetchAgentsTop(year),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    const { data: dataTopSeverityH } = useQuery({
        queryKey: ['agents-top-severity', year, "h"],
        queryFn: () => fetchAgentsTopSeverity(year, "h"),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    const { data: dataTopSeverityM } = useQuery({
        queryKey: ['agents-top-severity-deads', year, "m"],
        queryFn: () => fetchAgentsTopSeverity(year, "m"),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    const { data: alcoholH } = useQuery({
        queryKey: ['alcohol-levels', year, "h"],
        queryFn: () => fetchAlcoholLevels(year, "h"),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    const { data: alcoholM } = useQuery({
        queryKey: ['alcohol-levels-m', year, "m"],
        queryFn: () => fetchAlcoholLevels(year, "m"),
        placeholderData: [{ TOTAL_ACCIDENTES: 0 }]
    })

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Top agentes con m&aacute;s siniestros atendidos</h3>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-6 bottom-10 left-5 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div className="relative mb-6 flex">
                    <div className="z-10 flex-shrink-0">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
                            <UserCircleIcon />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="mb-1 flex items-center gap-1">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-theme-xs text-success-500 font-medium">M&aacute;s atentidos</p>
                        </div>
                        {dataTop.map((item: PropsTop) => (
                            <div key={item.TOTAL_ACCIDENTES}>
                                <div className="flex items-baseline">
                                    <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                        {item.NOMBRES} {item.APELLIDOS}
                                    </h3>
                                </div>
                                <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                                    {item.TOTAL_ACCIDENTES || 0}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative mb-6 flex">
                    <div className="z-10 flex-shrink-0">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
                            <UserCircleIcon />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="mb-1 flex items-center gap-1">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-theme-xs text-yellow-500 font-medium">M&aacute;s heridos atentidos</p>
                        </div>
                        {dataTopSeverityH.map((item: PropsTop) => (
                            <div key={item.TOTAL_ACCIDENTES}>
                                <div className="flex items-baseline">
                                    <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                        {item.NOMBRES} {item.APELLIDOS}
                                    </h3>
                                </div>
                                <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                                    {item.TOTAL_ACCIDENTES || 0}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mb-6 flex">
                    <div className="z-10 flex-shrink-0">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
                            <UserCircleIcon />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="mb-1 flex items-center gap-1">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-theme-xs text-red-500 font-medium">M&aacute;s fallecidos atentidos</p>
                        </div>
                        {dataTopSeverityM.map((item: PropsTop) => (
                            <div key={item.TOTAL_ACCIDENTES}>
                                <div className="flex items-baseline">
                                    <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                        {item.NOMBRES} {item.APELLIDOS}
                                    </h3>
                                </div>
                                <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                                    {item.TOTAL_ACCIDENTES || 0}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mb-6 flex">
                    <div className="z-10 flex-shrink-0">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
                            <UserCircleIcon />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="mb-1 flex items-center gap-1">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-theme-xs text-yellow-500 font-medium">M&aacute;s heridos atendidos por alcoholemia</p>
                        </div>
                        {alcoholH?.map((item: PropsTop) => (
                            <div key={item.TOTAL_ACCIDENTES}>
                                <div className="flex items-baseline">
                                    <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                        {item.NOMBRES} {item.APELLIDOS}
                                    </h3>
                                </div>
                                <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                                    {item.TOTAL_ACCIDENTES || 0}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex">
                    <div className="z-10 flex-shrink-0">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
                            <UserCircleIcon />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="mb-1 flex items-center gap-1">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-theme-xs text-red-500 font-medium">M&aacute;s fallecidos atendidos por alcoholemia</p>
                        </div>
                        {alcoholM?.map((item: PropsTop) => (
                            <div key={item.TOTAL_ACCIDENTES}>
                                <div className="flex items-baseline">
                                    <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                        {item.NOMBRES} {item.APELLIDOS}
                                    </h3>
                                </div>
                                <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                                    {item.TOTAL_ACCIDENTES || 0}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
