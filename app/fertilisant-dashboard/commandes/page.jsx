import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Tractor, MapPin } from "lucide-react";
import { OrdersKpiCards } from "@/app/ui/dashboard/commandes/kpi-cards";
import { CommandesFilters } from "@/app/ui/dashboard/commandes/filters";
import { OrdersTable } from "@/app/ui/dashboard/commandes/orders-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function page() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-muted/40 min-h-screen">
      {/* HEADER GLOBAL */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestion des Commandes
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble et gestion des commandes par saison et zone.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Global Context Selectors */}
          <Select defaultValue="sA2024">
            <SelectTrigger className="w-[160px] bg-background">
              <div className="flex items-center gap-2">
                <Tractor className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Saison" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sA2024">Saison A 2024</SelectItem>
              <SelectItem value="sB2024">Saison B 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-background">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Zone / Province" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les zones</SelectItem>
              <SelectItem value="ngozi">Ngozi</SelectItem>
              <SelectItem value="kayanza">Kayanza</SelectItem>
              <SelectItem value="gitega">Gitega</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-8 w-px bg-border mx-1 hidden lg:block"></div>

          {/* Global Actions */}
          <Button variant="outline" className="gap-2 bg-background">
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Nouvelle Commande</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <OrdersKpiCards />

      {/* Filters and Search */}
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <CommandesFilters />
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  );
}
