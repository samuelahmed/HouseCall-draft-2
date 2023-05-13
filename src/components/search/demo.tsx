import { columns } from "./columns";
import { DataTable } from '../layout/searchModal'
import { trpc } from "@/utils/trpc";

//do I need/want an entire functiononal component here, when I am just calling the data table?
function DataTableComponent() {
  const sessionData = trpc.careSessionAPIs.readAllSessionsForTable.useQuery();

  //without this, I get an error that sessionData.data is undefined.
  if (!sessionData.data) return <div>Loading...</div>;

  return (
    <div className="py-10 px-10">
      {<DataTable columns={columns} data={sessionData.data} />}
    </div>
  );
}

export default DataTableComponent;