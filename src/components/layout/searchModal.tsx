import { useState } from "react";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "../ui/button";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [showModal, setShowModal] = useState(false);

  //close modal if clicked outside of it

  return (
    <>
      {/* <div className="relative"> */}

      <div
        className="absolute right-2 bottom-2"
        onClick={() => (showModal ? setShowModal(false) : setShowModal(true))}
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-olive12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        id="default-search"
        className="block w-full border  bg-blue2 p-1.5 pl-4 text-sm text-olive12 focus:outline-none focus:ring-1 focus:ring-blue11 "
        placeholder="Search Sessions"
        required
        onClick={() => (showModal ? setShowModal(false) : setShowModal(true))}
        value={table.getColumn("overview")?.getFilterValue() as string}
        onChange={(event) => {
          if (event.target.value !== "") {
            setShowModal(true);
          } else {
            setShowModal(false);
          }

          table.getColumn("overview")?.setFilterValue(event.target.value);
        }}
      />
      {/* <input
        placeholder="Filter overview..."
        value={table.getColumn("overview")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("overview")?.setFilterValue(event.target.value)
        }
        onClick={() => (showModal ? setShowModal(false) : setShowModal(true))}

        className="max-w-sm"
      /> */}
      {/* </div> */}

      {showModal ? (
        <>
          <div className="absolute z-50 flex h-96 w-1/2 place-items-center overflow-hidden  border bg-yellow9 text-black md:w-1/3 ">
            <div className="border">
              <Table>
                {/* <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader> */}
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items- center justify-end space-x-2" >
              <div className="text-muted-foreground flex-1 text-sm">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  // variant="outline"
                  size="default"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  // variant="outline"
                  size="default"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>

            <Button
              variant="default"
              size="default"
              className="absolute inset-x-0 bottom-0 "
              onClick={() => setShowModal(false)}
            >
              close Search
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
//
// export default DataTable;
// export default SearchModal;
