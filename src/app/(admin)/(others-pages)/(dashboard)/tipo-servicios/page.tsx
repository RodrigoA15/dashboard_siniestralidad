import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TypeServiceCompany } from "@/components/type_service/TypeServiceCompany";
import { TypeServiceMonths } from "@/components/type_service/TypeServiceMonths";
import { TypeServicesMetrics } from "@/components/type_service/TypeServicesMetrics";

export default function TipoServicio() {
    return (

        <div>
            <PageBreadcrumb pageTitle="Tipo servicio" />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12">
                <TypeServicesMetrics />
            </div>

            <div className="col-span-12">
                <TypeServiceMonths />
            </div>

            <div className="col-span-12 xl:col-span-7">
                <TypeServiceCompany />
            </div>
        </div>
        </div>
    )
}