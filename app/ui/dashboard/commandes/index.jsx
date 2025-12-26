import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Tractor, MapPin, List } from "lucide-react";
import { OrdersKpiCards } from "@/app/ui/dashboard/commandes/kpi-cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommandeProv } from "./commande -prov-chart";
import { ChartPieHangarCtActive } from "./comparatif";
import { ChartLineAchats } from "./commandes-chart";
import Link from "next/link";

export default function Commandes() {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 min-h-screen">
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

          <div className="h-8 w-px bg-border mx-1 hidden lg:block"></div>

          {/* Global Actions */}
          <Link href="/fertilisant-dashboard/commandes/list">
            <Button className="gap-2 cursor-pointer">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Voir commandes</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <OrdersKpiCards />
      <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          <CommandeProv />
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
          <ChartPieHangarCtActive />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <ChartLineAchats />
        </div>
      </div>
    </div>
  );
}
