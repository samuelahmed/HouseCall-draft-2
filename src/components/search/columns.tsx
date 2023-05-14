import { CareSession } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
    header: "City",
    accessorKey: "city",
  },
];
