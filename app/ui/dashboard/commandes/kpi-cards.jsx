"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Truck,
} from "lucide-react";

export function OrdersKpiCards() {
  // TODO: Fetch real data
  const stats = {
    total: 342,
    conforme: 310,
    anomalie: 32,
    attentePaiement: 45,
    attenteLivraison: 120,
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {/* Total Orders */}
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-primary p-2 rounded-md">
              <ShoppingBag className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {stats.total}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums">
            Total Commandes
            <div className="text-sm font-normal text-muted-foreground">
              (Global)
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      {/* En Attente de Paiement */}
      {/* <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-yellow-500 p-2 rounded-md">
              <Wallet className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {stats.attentePaiement}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums">
            Attente Paiement
            <div className="text-sm font-normal text-muted-foreground">
              (Avance non reçue)
            </div>
          </CardTitle>
        </CardHeader>
      </Card> */}

      {/* En Attente de Livraison */}
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-yellow-500 p-2 rounded-md">
              <Truck className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {stats.attenteLivraison}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums">
            Attente Livraison
            <div className="text-sm font-normal text-muted-foreground">
              (Cmds non livrées)
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      {/* En Attente de Livraison */}
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-secondary p-2 rounded-md">
              <Truck className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {stats.attenteLivraison}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums">
            Livrées
            <div className="text-sm font-normal text-muted-foreground">
              (Cmds livrées)
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      {/* Commandes Conformes (Quota OK) */}
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-green-500 p-2 rounded-md">
              <CheckCircle2 className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {stats.conforme}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums">
            Conformes
            <div className="text-sm font-normal text-muted-foreground">
              (Quota OK)
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* En Anomalie (Quota Exceeded) */}
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-red-500 p-2 rounded-md">
              <AlertTriangle className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {stats.anomalie}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums">
            En Anomalie
            <div className="text-sm font-normal text-muted-foreground">
              (Quota dépassé)
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
