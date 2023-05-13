import { CareSession } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";


// This type is used to define the shape of our columns.
// Can add / delete columns here.

export const columns: ColumnDef<CareSession>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Medical Notes",
    accessorKey: "medicalNotes",
  },
  {
    header: "Overview",
    accessorKey: "overview",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Hourly Rate",
    accessorKey: "hourlyRate",
  },
  {
    header: "Total Hours",
    accessorKey: "totalHours",
  },
  {
    header: "Total Compensation",
    accessorKey: "totalCompensation",
  },
  // {
  //   header: "Accepted Caregiver Id",
  //   accessorKey: "acceptedCaregiverId",
  // },
  {
    header: "Care Session Status",
    accessorKey: "careSessionStatus",
  },
  {
    header: "Session Day",
    accessorKey: "sessionDay",
  },
  {
    header: "Session Month",
    accessorKey: "sessionMonth",
  },
  {
    header: "Session Year",
    accessorKey: "sessionYear",
  },
  {
    header: "Session Start Hour",
    accessorKey: "sessionStartHour",
  },
  {
    header: "Session Start Minute",
    accessorKey: "sessionStartMinute",
  },
  {
    header: "Session End Hour",
    accessorKey: "sessionEndHour",
  },
  {
    header: "Session End Minute",
    accessorKey: "sessionEndMinute",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Postal Code",
    accessorKey: "postalCode",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Slug",
    accessorKey: "slug",
  },
];