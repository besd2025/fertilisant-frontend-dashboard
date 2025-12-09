import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function StockSummaryCard() {
  return (
    <Card className="@container/stock h-full">
      <CardHeader>
        <div className="flex flex-row gap-x-2 items-center">
          <div className="bg-destructive p-2 rounded-md">
            <Package className="text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Stock Actuel</CardTitle>
        </div>
        <CardDescription>État des stocks en temps réel</CardDescription>
      </CardHeader>

      <CardContent className="">
        <div className="">
          <div className="flex flex-col gap-1 p-3 bg-primary/10 rounded-lg">
            <span className="font-medium text-muted-foreground">
              Quantite{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (toutes variétés)
              </span>
            </span>
            <span className="text-2xl font-bold ">
              45 458
              <span className="text-base">T</span>
            </span>
            <span className="text-sm text-muted-foreground">
              Nombre de sacs : 45
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 ml-6">
          <div className="flex flex-col gap-1 p-3 border-l-2 border-l-primary">
            <span className=" text-sm text-muted-foreground">Types :</span>
            <div className="flex flex-wrap gap-4   ">
              <div className="flex flex-col gap-y-2 font-semibold">
                <span>
                  TOTAHAZA : 30 <span className="text-xs">T</span>
                  <span className="font-normal text-sm text-muted-foreground flex flex-row gap-x-1 items-center">
                    <ShoppingBag className="text-secondary size-4" />
                    <span>sacs: 45</span>
                  </span>
                </span>
                <Separator />
                <span>
                  IMBURA : 15.2 <span className="text-xs">T</span>
                  <span className="font-normal text-sm text-muted-foreground flex flex-row gap-x-1 items-center">
                    <ShoppingBag className="text-secondary size-4" />
                    <span>sacs: 45</span>
                  </span>
                </span>
                <Separator />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-3 border-l-2 border-l-secondary">
            <div className="flex flex-wrap gap-4   ">
              <div className="flex flex-col gap-y-2 font-semibold">
                <span>
                  BAGARA : 30 <span className="text-xs">T</span>
                  <span className="font-normal text-sm text-muted-foreground flex flex-row gap-x-1 items-center">
                    <ShoppingBag className="text-secondary size-4" />
                    <span>sacs: 45</span>
                  </span>
                </span>
                <Separator />
                <span>
                  DOLOMIE : 15.2 <span className="text-xs">T</span>
                  <span className="font-normal text-sm text-muted-foreground flex flex-row gap-x-1 items-center">
                    <ShoppingBag className="text-secondary size-4" />
                    <span>sacs: 45</span>
                  </span>
                </span>
                <Separator />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center gap-2 justify-between p-3 border/5 rounded-lg mt-2">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-1.5 rounded-full dark:bg-green-900">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Valeur Totale</span>
              <span className="text-xs text-muted-foreground">Estimée</span>
            </div>
          </div>
          <span className="text-xl font-bold tabular-nums">53M FBU</span>
        </div> */}
      </CardContent>
    </Card>
  );
}
