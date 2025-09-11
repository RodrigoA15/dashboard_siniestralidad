import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import { AccidentsByDateMap } from "@/components/maps/AccidentsByDateMap"

export default function Maps() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Mapas" />
      <div className="space-y-5 sm:space-y-6">
        <AccidentsByDateMap />
      </div>
    </div>
  )
} 