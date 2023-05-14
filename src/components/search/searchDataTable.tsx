import { columns } from "./columns";
import { DataTable } from './searchModal'
import { trpc } from "@/utils/trpc";

function DataTableComponent() {
  const sessionData = trpc.careSessionAPIs.readAllSessionsForTable.useQuery();

  if (!sessionData.data) return <div>Loading...</div>;

  return (
    <div className="    ">
      {<DataTable columns={columns} data={sessionData.data} />}
    </div>
  );
}

export default DataTableComponent;