"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Filter, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTransactions, Transaction } from "@/hooks/useTransactions"
import { TimelineStatus } from "@/components/transactions/TimelineStatus"

// Need to create Input and Table components from shadcn first? 
// Yes, I haven't created them yet. I will create them inline or separate. 
// For speed, I'll assume they exist or I'll implement them in the next tool call if I haven't.
// Wait, I strictly need to create them. I'll create `input.tsx` and `table.tsx` after this.

export function TransactionsTable() {
    const { data: transactions, isLoading } = useTransactions()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: "terminalId",
            header: "Terminal ID",
            cell: ({ row }) => <div className="font-medium">{row.getValue("terminalId")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <Badge variant={status === 'success' ? 'success' : 'destructive'} className="uppercase">
                        {status}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "amount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 hover:bg-transparent"
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-mono font-medium">₦{row.getValue<number>("amount").toLocaleString()}</div>,
        },
        {
            accessorKey: "timestamp",
            header: "Date Time",
            cell: ({ row }) => <div className="text-slate-500 text-xs">{new Date(row.getValue("timestamp")).toLocaleString()}</div>,
        },
        {
            id: "failureReason",
            header: "Info / Failure",
            cell: ({ row }) => {
                const reason = row.original.failureReason
                return reason ? <span className="text-red-500 text-xs font-medium">{reason}</span> : <span className="text-slate-400 text-xs">-</span>
            }
        },
        {
            id: "timeline",
            header: "Timeline",
            cell: ({ row }) => {
                const txn = row.original
                const getTimeline = (txn: Transaction) => {
                    if (txn.status === 'success') {
                        return [
                            { status: 'completed', label: 'Initiated' },
                            { status: 'completed', label: 'Processing' },
                            { status: 'completed', label: 'Completed' },
                        ];
                    }
                    if (txn.status === 'failed') {
                        return [
                            { status: 'completed', label: 'Initiated' },
                            { status: 'failed', label: txn.failureReason || 'Failed' },
                            { status: 'current', label: 'Reversal Queued', timestamp: txn.reversalEta ? `ETA: ${new Date(txn.reversalEta).toLocaleTimeString()}` : undefined },
                            { status: 'pending', label: 'Reversal Success' },
                        ];
                    }
                    return [];
                };
                // @ts-ignore
                return <TimelineStatus steps={getTimeline(txn)} />
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data: transactions || [],
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
    })

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading transactions...</div>

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                    <Input
                        placeholder="Filter terminal IDs..."
                        value={(table.getColumn("terminalId")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("terminalId")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Button variant="outline" size="sm" className="hidden lg:flex gap-2">
                        <Filter className="h-4 w-4" /> Status
                    </Button>
                </div>

                <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" /> Export
                </Button>
            </div>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
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
                                    )
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
