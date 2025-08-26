'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import { useQuery } from '@tanstack/react-query'
import { useFetchTypeServices } from '@/api/dashboard/fetchTypeService'
import { useYear } from '@/context/YearContext'
import Pagination from '../tables/Pagination'

interface PropsData {
  RAZON_SOCIAL: string,
  TOTAL_HERIDOS: number,
  TOTAL_MUERTOS: number,
  TOTAL: number
}

export const TypeServiceCompany = () => {
  const { year } = useYear()
  const { typeServicesCompanies } = useFetchTypeServices()
  const [currentPage, setCurrentPage] = useState(1)

  // Configuración de la paginación
  const itemsPerPage = 5

  const { data = [], isLoading, isError } = useQuery<PropsData[]>({
    queryKey: ["type-services-companies", year],
    queryFn: () => typeServicesCompanies(year),
    initialData: []
  })

  if (isLoading) {
    return <div className="p-4 text-gray-500">Cargando...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Ocurrió un error al cargar los datos.</div>
  }

  // Calcular datos paginados
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Siniestros  por empresas de transporte p&uacute;blico ({year})
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
                  Razón Social
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
                  Fallecidos
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
                paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.RAZON_SOCIAL || "SIN RAZÓN SOCIAL"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.TOTAL_HERIDOS || 0}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400">
                      {item.TOTAL_MUERTOS || 0}
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
