"use client"

import * as React from "react"
import { Building2, ChevronsUpDown, Check, PlusCircle } from "lucide-react"

import { cn } from "@/utils/cn"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/store/useStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BusinessSwitcher() {
    const { currentBusiness, availableBusinesses, switchBusiness } = useStore()
    const [open, setOpen] = React.useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 text-left shadow-sm transition-all hover:bg-slate-50 w-full outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold text-slate-900 leading-tight">
                            {currentBusiness.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            ID: {currentBusiness.accountNumber}
                        </p>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 text-slate-400" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2" align="start">
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    Switch Business
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    {availableBusinesses.map((business) => (
                        <DropdownMenuItem
                            key={business.id}
                            onSelect={() => {
                                switchBusiness(business.id)
                                setOpen(false)
                            }}
                            className="gap-3 p-2 cursor-pointer"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 border border-slate-200">
                                <span className="text-xs font-bold text-slate-600">
                                    {business.name.substring(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium leading-none">
                                    {business.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {business.role}
                                </p>
                            </div>
                            {currentBusiness.id === business.id && (
                                <Check className="ml-auto h-4 w-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer text-blue-600">
                    <PlusCircle className="h-4 w-4" />
                    <span className="font-medium">Add New Business</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
