import { AgentsMetrics } from "@/components/agents/AgentsMetrics";
import { TableTopAgents } from "@/components/agents/TableTopAgents";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function Agentes() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Agentes" />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                    <AgentsMetrics />
                </div>

                <div className="col-span-12 xl:col-span-6">
                    <TableTopAgents />
                </div>
            </div>
        </div>
    )
}