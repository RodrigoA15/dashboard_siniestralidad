import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TotalAccidentsInjuredYears } from "@/components/type_service/TopAccidentsInjuredYears";
import { TopCompanies } from "@/components/type_service/TopCompanies";
import { TotalAccidents } from "@/components/type_service/TotalAccidents";
import { TotalAccidentsByYears } from "@/components/type_service/TotalAccidentsByYears";
import { TotalAccidentsInjured } from "@/components/type_service/TotalAccidentsInjured";
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

            <div className="col-span-12 xl:col-span-6">
                <TypeServiceCompany />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TopCompanies />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TotalAccidents />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TotalAccidentsInjured />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TotalAccidentsByYears />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <TotalAccidentsInjuredYears />
            </div>
        </div>
        </div>
    )
}