"use client";

import React from "react";
import { Search, Calendar, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export function CommandesFilters() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Filters Scrollable Row */}
      <div className="flex flex-row gap-2 w-full overflow-x-auto pb-2 items-center">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />

        {/* Statut Commande */}
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Statut Commande" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="delivered">Livré</SelectItem>
            <SelectItem value="not_delivered">Non Livré</SelectItem>
            <SelectItem value="delivered">En attente</SelectItem>
          </SelectContent>
        </Select>

        {/* Type d'intrant */}
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type d'intrant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="all">TOTAHAZA</SelectItem>
            <SelectItem value="npk">IMBURA</SelectItem>
            <SelectItem value="uree">BAGARA</SelectItem>
            <SelectItem value="dap">DOLOMIE</SelectItem>
          </SelectContent>
        </Select>

        {/* Superficie (Min/Max) - Simplified as range selector or dropdown for prototype */}
        {/* <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Superficie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toute superficie</SelectItem>
            <SelectItem value="small">0 - 0.5 ha</SelectItem>
            <SelectItem value="medium">0.5 - 2 ha</SelectItem>
            <SelectItem value="large"> 2 ha</SelectItem>
          </SelectContent>
        </Select> */}

        <Separator orientation="vertical" className="h-8" />

        {/* Solde Payé */}
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Paye en ?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Avance</SelectItem>
            <SelectItem value="no">Totalité</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex ml-auto gap-2 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Réinitialiser filtres
        </Button>
      </div>
    </div>
  );
}
