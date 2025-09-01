'use client'

import { useState } from "react"
import Pagination from "../tables/Pagination"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table"
import { useQuery } from "@tanstack/react-query"
import { useFetchVehicleTypes } from "@/api/dashboard/fetchVehicleTypes"
import { useYear } from "@/context/YearContext"

interface PropsData {
  DESC_CLASE_QX: string,
  TOTAL_HERIDOS: number,
  TOTAL_MUERTOS: number,
  TOTAL: number
}

export const TopVehiclesSeverities = () => {
  const {allVehiclesBySeverities} = useFetchVehicleTypes()
  const {year} = useYear()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const {data, isLoading} = useQuery({
    queryKey: ['top-type-vehicles', year],
    queryFn: () => allVehiclesBySeverities(year),
    initialData: []
    })

  // Calcular datos paginados
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)

    if(isLoading){
        return (
            <div className="p-4 text-gray-500">Cargando...</div>
        )
    }
  return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gravedad por tipo vehiculos a&ntilde;o ({year})
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
                  Clase
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fallecidos
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Heridos
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Cuerpo */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.length > 0 ? (
                paginatedData.map((item : PropsData, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.DESC_CLASE_QX || "SIN CLASE"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.TOTAL_MUERTOS || 0}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.TOTAL_HERIDOS || 0}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.TOTAL ?? 0}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="px-4 py-6 text-center text-gray-400 text-theme-sm"
                  >
                    No hay datos disponibles.
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
