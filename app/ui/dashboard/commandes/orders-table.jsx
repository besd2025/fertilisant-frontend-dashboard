"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  MoreHorizontal,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PaginationControls from "@/components/ui/pagination-controls"; // Assuming generic component
import ExportButton from "@/components/ui/export_button"; // Assuming generic component
import ViewImageDialog from "@/components/ui/view-image-dialog";
import Edit from "./edit";
import Details from "./details";
import Link from "next/link";
// import Filter from "../filter"; // Keeping consistent with HangarsListTable but commenting out if not directly usable, can enable later

export function OrdersTable() {
  // Dummy Data
  const initialOrders = [
    {
      id: "#CMD-001",
      date: "2023-10-25 14:30",
      beneficiary: { name: "Jean Dupont", avatar: "JD", zone: "Zone 1" },
      products: [
        {
          name: "TOTAHAZA",
          quantity: 10,
          price: 5000,
        },
        {
          name: "IMBURA",
          quantity: 10,
          price: 5000,
        },
      ],
      total: 50000,
      status: "paid",
    },
    {
      id: "#CMD-002",
      date: "2023-10-24 09:15",
      beneficiary: { name: "Marie Curie", avatar: "MC", zone: "Zone 2" },
      products: [
        {
          name: "TOTAHAZA",
          quantity: 10,
          price: 5000,
        },
        {
          name: "IMBURA",
          quantity: 10,
          price: 5000,
        },
        {
          name: "TOTAHAZA",
          quantity: 10,
          price: 5000,
        },
        {
          name: "IMBURA",
          quantity: 10,
          price: 5000,
        },
      ],
      total: 75000,
      status: "paid_advance",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState(initialOrders);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "draft":
        return (
          <span className="bg-primary-100/50 border border-primary-200 text-primary-800 text-xs px-2 py-1 rounded-full">
            Brouillon
          </span>
        );
      case "paid_advance":
        return (
          <span className="bg-yellow-100/50 border border-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Payé (Avance)
          </span>
        );
      case "paid":
        return (
          <span className="bg-indigo-100/50 border border-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full">
            Payé (Totalité)
          </span>
        );
      case "delivered":
        return (
          <span className="bg-green-100/50 border border-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
            Livré
          </span>
        );

      default:
        return status;
    }
  };

  const columns = [
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <div className="w-full">
                  <Details order={row.original} />
                </div>

                <div className="w-full">
                  <Edit order={row.original} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID Commande
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "beneficiary",
      header: "Bénéficiaire",
      // Filter by name inside the object
      filterFn: (row, columnId, filterValue) => {
        const beneficiary = row.original.beneficiary;
        if (!filterValue) return true;
        const search = filterValue.toLowerCase();
        return beneficiary.name.toLowerCase().includes(search);
      },
      cell: ({ row }) => {
        const { name, avatar, zone } = row.original.beneficiary;
        return (
          <div className="flex items-center gap-2">
            <ViewImageDialog imageUrl={avatar || null} alt={`${name}`} />
            <div>
              <span className="block text-gray-800 text-theme-sm dark:text-white/90 font-bold">
                {name}
              </span>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {zone}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Produits(sacs)",
      cell: ({ row }) => {
        const products = row.getValue("products");
        if (!Array.isArray(products)) return null;
        return (
          <div className="flex flex-col gap-1">
            {products.map((product, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{product.name}</span>
                <span className="text-xs ml-2">({product.quantity})</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Montant (FBU)",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        return <div className="font-medium">{amount.toLocaleString()} FBU</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
  ];

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
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full bg-sidebar p-4 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 py-4 ">
        <div className="relative ">
          <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5 " />
          <Input
            placeholder="Rechercher (Bénéficiaire)..."
            value={table.getColumn("beneficiary")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("beneficiary")?.setFilterValue(event.target.value)
            }
            className="pl-10 flex-1  shadow-none w-[300px] lg:w-[380px] rounded-lg bg-background max-w-sm border-none"
          />
        </div>

        <div className="flex flex-row justify-between gap-x-3">
          {/* <div className="flex items-center gap-3">
             <Filter /> 
          </div> */}
          <div className="flex items-center gap-3 text-gray-700">
            <ExportButton />
          </div>
        </div>
      </div>
      <div className="grid w-full [&>div]:max-h-max [&>div]:border [&>div]:rounded-md overflow-x-auto">
        <Table className="min-w-[1000px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className=" sticky top-0 bg-background z-10 hover:bg-background"
              >
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
          </TableHeader>
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
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} sur{" "}
          {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <PaginationControls
          page={table.getState().pagination.pageIndex + 1}
          pageSize={table.getState().pagination.pageSize}
          totalItems={table.getFilteredRowModel().rows.length}
          totalPages={table.getPageCount()}
          onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
          onPageSizeChange={(size) => table.setPageSize(size)}
          hasNextPage={table.getCanNextPage()}
          hasPreviousPage={table.getCanPreviousPage()}
        />
      </div>
    </div>
  );
}
