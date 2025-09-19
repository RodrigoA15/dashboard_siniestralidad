'use client'

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table"
import Pagination from "../tables/Pagination"
import { useAgentsFetch } from "@/api/dashboard/fetchAgents"
import { useYear } from "@/context/YearContext"
import Badge from "../ui/badge/Badge";

interface PropsData {
    NOMBRES: string
    ESTADO_AGENTE: string
    TOTAL_HERIDOS: number
    TOTAL_MUERTO: number
    TOTAL_ACCIDENTES: number
}
export const TableTopAgents = () => {
    const { year } = useYear()
    const { fetchTopAgents } = useAgentsFetch()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const { data, isError } = useQuery({
        queryKey: ['top-agents-accients', year],
        queryFn: () => fetchTopAgents(year),
        placeholderData: []
    })

    // Calcular datos paginados
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = data.slice(startIndex, endIndex)
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Top agentes con m&aacute;s siniestros atendidos ({year})
                </h3>
            </div>

            <div className="max-w-full overflow-x-auto">
                <div className="my-6">
                    <Table>
                        {/* Encabezados */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Nombres
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Estado agente
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Total Fallecidos
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Total Heridos
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Total Accidentes
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Cuerpo */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item: PropsData, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                                            {item.NOMBRES || "N/A"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                                            <Badge
                                                size="sm"
                                                color={
                                                    item.ESTADO_AGENTE === "A"
                                                        ? "success"
                                                        : item.ESTADO_AGENTE === "I"
                                                            ? "error"
                                                            : "info"
                                                }
                                            >
                                                {item.ESTADO_AGENTE}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                                            {item.TOTAL_HERIDOS || 0}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                                            {item.TOTAL_MUERTO || 0}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                                            {item.TOTAL_ACCIDENTES ?? 0}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        className="px-4 py-6 text-center text-gray-400 text-theme-sm"
                                    >
                                        No hay datos disponibles. {isError}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginación local */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
        </div>
    )
}
