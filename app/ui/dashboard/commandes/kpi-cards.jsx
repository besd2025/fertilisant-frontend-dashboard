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
import { fetchData } from "@/app/_utils/api";
export function OrdersKpiCards() {
  const [stats, setStats] = React.useState();
  const [commande_attente_livre, setCommandeAttenteLivre] = React.useState();
  const [commande_livre, setCommandeLivre] = React.useState();
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetchData(
          "get",
          "fertilisant/commandes/get_total_commandes/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const commande_attente_livre = await fetchData(
          "get",
          "fertilisant/receptions/get_commande_non_livre_or_no_paid/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const commande_livre = await fetchData(
          "get",
          "fertilisant/receptions/get_commande_paid_livre/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        setStats(response);
        setCommandeAttenteLivre(commande_attente_livre);
        setCommandeLivre(commande_livre);
      } catch (error) {
        console.error("Error fetching orders stats:", error);
      }
    };
    fetchStats();
  }, []);

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
              {stats?.total_commandes}
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

      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-yellow-500 p-2 rounded-md">
              <Truck className="text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
              {commande_attente_livre?.nombre_sacs_non_livre}
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
              {commande_livre?.nombre_sacs_livre}
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
    </div>
  );
}
