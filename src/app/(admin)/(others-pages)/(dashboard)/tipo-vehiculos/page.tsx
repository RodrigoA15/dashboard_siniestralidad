import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TopVehiclesSeverities } from "@/components/vehicles_types/TopVehiclesSeverities";
import { TotalVehiclesSeverities } from "@/components/vehicles_types/TotalVehiclesSeverities";
import { VehiclesTypeMetrics } from "@/components/vehicles_types/VehiclesTypeMetrics";
import { VehicleTypesMonths } from "@/components/vehicles_types/VehicleTypesMonths";

export default function TipoVehiculos() {
    return (
        <div>
        <PageBreadcrumb pageTitle="Tipo vehiculos" />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12">
                <VehiclesTypeMetrics />
            </div>

            <div className="col-span-12">
                <VehicleTypesMonths />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TopVehiclesSeverities />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TotalVehiclesSeverities />
            </div>
        </div>
        </div>
    )
}