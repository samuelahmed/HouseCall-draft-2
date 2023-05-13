import { CareSession } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";


// This type is used to define the shape of our columns.
// Can add / delete columns here.

export const columns: ColumnDef<CareSession>[] = [
    {
        header: "Title",
        accessorKey: "title",
      },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Address",
    accessorKey: "address",
  },

  {
    header: "Overview",
    accessorKey: "overview",
  },


  {
    header: "Care Session Status",
    accessorKey: "careSessionStatus",
  },
  {
    header: "Session Day",
    accessorKey: "sessionDay",
  },
  
  {
    header: "City",
    accessorKey: "city",
  },

];