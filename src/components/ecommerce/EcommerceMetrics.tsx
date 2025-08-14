"use client";
import React from "react";
import { useQueries } from "@tanstack/react-query";
import { useFetchTotals } from "@/api/dashboard/fetchTotals";
import { useYear } from '../../context/YearContext';
export const fetchTotalSiniestros = async() =>  {
}
export const EcommerceMetrics = () => {
  const { fetchTotals, fetchTotalYears } = useFetchTotals();
  const {year} = useYear();
  const [totals, totalYears] = useQueries({
  queries : [
  { 
    queryKey: ["totals"],
    queryFn: fetchTotals,
    placeholderData: [{
      total_accidents: 0,
    }]
  },
  { 
    queryKey: ["totalYears", year],
    queryFn: () => fetchTotalYears(year),
    placeholderData: [{
      TOTAL: 0,
    }]
  }
  ]
  });

  if(totals.isError){
    return <div>Error</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total siniestros
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totals.data[0].total_accidents || "0"}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total siniestros {year}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalYears.data[0].TOTAL || "0"}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
