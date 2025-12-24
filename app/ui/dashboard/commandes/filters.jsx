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
      {/* Top Bar: Search and Primary Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher (Nom, Code, Téléphone)..."
            className="pl-8 w-full bg-background"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex ml-auto gap-2 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Réinitialiser filtres
        </Button>
      </div>

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
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="confirmed">Confirmé</SelectItem>
            <SelectItem value="paid_advance">Payé (Avance)</SelectItem>
            <SelectItem value="paid_balance">Payé (Solde)</SelectItem>
            <SelectItem value="delivered">Livré</SelectItem>
            <SelectItem value="closed">Clôturée</SelectItem>
          </SelectContent>
        </Select>

        {/* Type d'intrant */}
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type d'intrant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="npk">NPK 17-17-17</SelectItem>
            <SelectItem value="uree">Urée</SelectItem>
            <SelectItem value="dap">DAP</SelectItem>
            <SelectItem value="kcl">KCL</SelectItem>
          </SelectContent>
        </Select>

        {/* Superficie (Min/Max) - Simplified as range selector or dropdown for prototype */}
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Superficie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toute superficie</SelectItem>
            <SelectItem value="small">0 - 0.5 ha</SelectItem>
            <SelectItem value="medium">0.5 - 2 ha</SelectItem>
            <SelectItem value="large"> 2 ha</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-8" />

        {/* Avance Payée */}
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Avance ?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Indifférent</SelectItem>
            <SelectItem value="yes">Oui</SelectItem>
            <SelectItem value="no">Non</SelectItem>
          </SelectContent>
        </Select>

        {/* Solde Payé */}
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Solde ?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Indifférent</SelectItem>
            <SelectItem value="yes">Oui</SelectItem>
            <SelectItem value="no">Non</SelectItem>
          </SelectContent>
        </Select>

        {/* Bon d'achat */}
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Bon d'achat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="valid">Valide</SelectItem>
            <SelectItem value="used">Utilisé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
