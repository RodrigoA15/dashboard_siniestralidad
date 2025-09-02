"use client";

import { InitialMap } from "../InitialMaps/InitialMap";

export default function DemographicCard() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Mapa Siniestralidad
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            N&uacute;mero de siniestros basados en gravedad
          </p>
        </div>
      </div>
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[312px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <InitialMap />
        </div>
      </div>
    </div>
  );
}
