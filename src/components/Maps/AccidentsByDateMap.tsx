'use client'

import React from 'react'
import { InitialMap } from '../InitialMaps/InitialMap'
import { PredictionMap } from './PredictionMap'
import { GeoJsonMap } from './GeoJsonMap'

export const AccidentsByDateMap = () => {
    return (
        <div className='rounded-2xl bg-white dark:bg-white/[0.03] shadow-lg'>
            <div className='p-4 sm:p-6'>
                <div className='space-y-6'>
                    <div className='grid gap-5 gird-cols-1 sm:grid-cols-1 xl:grid-cols-2 xl:gap-6'>
                        <div className="rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-md shadow-xl p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Siniestros por año actual ({new Date().getFullYear()})
                                </h3>
                            </div>
                            <div
                                id="embed-map"
                                className="maps_map-embed mapboxgl-map h-[320px] w-full rounded-xl overflow-hidden"
                            >
                                <InitialMap />
                            </div>
                        </div>

                        <div className='rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-md shadow-xl p-6'>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    B&uacute;squeda por fecha y Predicci&oacute;n de puntos de fotodetecci&oacute;n
                                </h3>
                            </div>
                            <div
                                id="embed-map"
                                className="maps_map-embed mapboxgl-map h-[320px] w-full rounded-xl overflow-hidden"
                            >
                                <PredictionMap />
                            </div>
                        </div>

                        <div className='rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-md shadow-xl p-6'>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    GeoJson
                                </h3>
                            </div>
                            <div
                                id="embed-map"
                                className="maps_map-embed mapboxgl-map h-[320px] w-full rounded-xl overflow-hidden"
                            >
                                <GeoJsonMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
