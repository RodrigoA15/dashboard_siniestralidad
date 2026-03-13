'use client'

import React from 'react'
import { useQueries } from '@tanstack/react-query'
import { useAgentsFetch } from '@/api/dashboard/fetchAgents'
import { useYear } from '@/context/YearContext'
import { UserCircleIcon } from '@/icons'

interface PropsTop {
    TOTAL_ACCIDENTES: number
    NOMBRES?: string
    APELLIDOS?: string
}

type QueryResult = {
    data?: PropsTop[] | null
    isLoading: boolean
    isError: boolean
}

const STALE_TIME = 1000 * 60 * 5 // 5 minutos

const AgentRow = React.memo(function AgentRow({ item }: { item: PropsTop }) {
    const fullName = `${item.NOMBRES ?? ''} ${item.APELLIDOS ?? ''}`.trim() || '—'
    return (
        <div className="mb-3" aria-label={`agent-${fullName}`}>
            <div className="flex items-baseline">
                <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {fullName}
                </h3>
            </div>
            <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                {item.TOTAL_ACCIDENTES ?? 0}
            </p>
        </div>
    )
})

export const TopActivities: React.FC = () => {
    const { year } = useYear()
    const { fetchAgentsTop, fetchAgentsTopSeverity, fetchAlcoholLevels } = useAgentsFetch()

    const queries = useQueries({
        queries: [
            {
                queryKey: ['agents-top', year],
                queryFn: () => fetchAgentsTop(year),
                staleTime: STALE_TIME,
                placeholderData: [{ TOTAL_ACCIDENTES: 0 }],
                enabled: !!year,
            },
            {
                queryKey: ['agents-top-severity', year, 'h'],
                queryFn: () => fetchAgentsTopSeverity(year, 'h'),
                staleTime: STALE_TIME,
                placeholderData: [{ TOTAL_ACCIDENTES: 0 }],
                enabled: !!year,
            },
            {
                queryKey: ['agents-top-severity', year, 'm'],
                queryFn: () => fetchAgentsTopSeverity(year, 'm'),
                staleTime: STALE_TIME,
                placeholderData: [{ TOTAL_ACCIDENTES: 0 }],
                enabled: !!year,
            },
            {
                queryKey: ['alcohol-levels', year, 'h'],
                queryFn: () => fetchAlcoholLevels(year, 'h'),
                staleTime: STALE_TIME,
                placeholderData: [{ TOTAL_ACCIDENTES: 0 }],
                enabled: !!year,
            },
            {
                queryKey: ['alcohol-levels', year, 'm'],
                queryFn: () => fetchAlcoholLevels(year, 'm'),
                staleTime: STALE_TIME,
                placeholderData: [{ TOTAL_ACCIDENTES: 0 }],
                enabled: !!year,
            },
        ],
    })

    const [
        topQuery,
        topSeverityHQuery,
        topSeverityMQuery,
        alcoholHQuery,
        alcoholMQuery,
    ] = queries as QueryResult[]

    const isAnyLoading = queries.some(q => q.isLoading)
    const isAnyError = queries.some(q => q.isError)

    const renderList = (list?: PropsTop[] | null) => {
        if (!list || list.length === 0) return <p className="text-theme-sm text-gray-500">Sin datos</p>
        return list.map((item, idx) => (
            // key más estable: combinación nombre + total + idx (por si acaso)
            <AgentRow key={`${item.NOMBRES ?? 'x'}-${item.APELLIDOS ?? 'x'}-${item.TOTAL_ACCIDENTES}-${idx}`} item={item} />
        ))
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Top agentes con más siniestros atendidos
                    </h3>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-6 bottom-10 left-5 w-px bg-gray-200 dark:bg-gray-800" />

                {isAnyError && (
                    <div className="mb-4 rounded p-2 text-sm text-red-600 dark:text-red-400">
                        Ocurrió un error al cargar los datos.
                    </div>
                )}

                {isAnyLoading && (
                    <div className="mb-4 text-sm text-gray-500">Cargando datos…</div>
                )}

                <section className="relative mb-6 flex">
                    <div className="z-10 flex-shrink-0">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90">
                            <UserCircleIcon />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="mb-1 flex items-center gap-1">
                            {/* SVG reducido por claridad */}
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-theme-xs text-success-500 font-medium">Más atendidos</p>
                        </div>

                        {renderList(topQuery.data ?? [])}
                    </div>
                </section>

                <section className="relative mb-6 flex">
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
                            <p className="text-theme-xs text-yellow-500 font-medium">Más heridos atendidos</p>
                        </div>

                        {renderList(topSeverityHQuery.data ?? [])}
                    </div>
                </section>

                <section className="relative mb-6 flex">
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
                            <p className="text-theme-xs text-red-500 font-medium">Más fallecidos atendidos</p>
                        </div>

                        {renderList(topSeverityMQuery.data ?? [])}
                    </div>
                </section>

                <section className="relative mb-6 flex">
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
                            <p className="text-theme-xs text-yellow-500 font-medium">Más heridos atendidos por alcoholemia</p>
                        </div>

                        {renderList(alcoholHQuery.data ?? [])}
                    </div>
                </section>

                <section className="relative flex">
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
                            <p className="text-theme-xs text-red-500 font-medium">Más fallecidos atendidos por alcoholemia</p>
                        </div>

                        {renderList(alcoholMQuery.data ?? [])}
                    </div>
                </section>
            </div>
        </div>
    )
}
