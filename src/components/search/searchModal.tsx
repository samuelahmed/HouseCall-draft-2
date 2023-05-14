import { useState } from "react";
import { Button } from "../ui/button";
import * as React from "react";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
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

import { useRouter } from "next/router";
import { getIOSInputEventHandlers } from "../../lib/zoomHandler";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { slug: string }, TValue>({
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
  const router = useRouter();
  //TODO: close modal if clicked outside of it

  return (
    <>
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
        {...getIOSInputEventHandlers()}
        id="default-search"
        className="block w-full border bg-blue2 p-1.5 pl-4 text-sm text-olive12 focus:outline-none focus:ring-1 focus:ring-blue11 "
        placeholder="Search Sessions"
        required
        value={table.getColumn("overivew")?.getFilterValue() as string}
        onChange={(event) => {
          if (event.target.value !== "") {
            setShowModal(true);
          } else {
            setShowModal(false);
          }
          table.getColumn("overview")?.setFilterValue(event.target.value);
        }}
      />
      {showModal ? (
        <>
          <div className="absolute z-50 flex max-h-96 min-h-20vh w-full flex-col place-items-center border bg-white text-black">
            <div className="w-full overflow-auto bg-white">
              <Table>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() =>
                          router.push(`/careSession/${row.original.slug}`)
                        }
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
                        className="min-h-20vh min-w-40vw text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex w-full items-center justify-center text-sm md:text-base ">
              <Button
                variant="default"
                size="default"
                className=""
                onClick={() => setShowModal(false)}
              >
                close Search
              </Button>{" "}
            </div>
          </div>

          {/* <div className=" inset-x-0 bottom-0 overflow-hidden">
            <Button
              variant="default"
              size="default"
              className=""
              onClick={() => setShowModal(false)}
            >
              close Search
            </Button>
          </div> */}
        </>
      ) : null}
    </>
  );
}
