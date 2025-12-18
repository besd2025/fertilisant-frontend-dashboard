"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Banknote,
  Truck,
  Sprout,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { fetchData } from "@/app/_utils/api";
import { Badge } from "@/components/ui/badge";

export default function DetailsBeneficiaire() {
  const [data, setData] = React.useState(0);

  React.useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const data = await fetchData(
          "get",
          "fertilisant/commandes/get_total_quantite_par_commande_type/",
          {
            params: {},
          }
        );

        setData(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchSummaryData();
  }, []);

  const StatCard = ({ title, icon: Icon, colorClass, delay }) => (
    <div
      className={`group relative overflow-hidden rounded-lg  bg-muted text-card-foreground  transition-all ${delay}`}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg `}>
            <Icon className={`w-5 h-5 ${colorClass.replace("bg-", "text-")}`} />
          </div>
          <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
        </div>

        <div className="space-y-3 pt-2">
          {/* Main Quantity */}
          <div className="grid grid-cols-2 gap-4 bg-secondary/10 rounded-lg ">
            <div className="flex flex-col gap-1 p-3 transition-colors">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Truck className="w-3 h-3" /> Quantité
              </span>
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {data?.total_commandes_urea >= 1000 ? (
                  <>
                    {(data?.total_commandes_urea / 1000).toLocaleString(
                      "fr-FR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    <span className="text-sm font-medium text-muted-foreground">
                      T
                    </span>
                  </>
                ) : (
                  <>
                    {data?.total?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm font-medium text-muted-foreground">
                      Kg
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 p-3 transition-colors">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <ShoppingBag className="w-3 h-3" /> Sacs
              </span>
              <div className="text-xl font-bold">45</div>
            </div>
          </div>

          <Separator className="my-2 bg-border/50" />

          {/* Details Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm group/row hover:bg-muted/30 p-1 rounded transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-1 rounded text-primary">
                  <Banknote className="w-3.5 h-3.5" />
                </div>
                <span>Avance</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-green-600 bg-green-500/10 border-green-500/20 px-1.5 h-5 text-[10px]"
                >
                  OUI
                </Badge>
                <span className="text-muted-foreground font-medium text-xs tabular-nums">
                  (5000 BIF)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm group/row hover:bg-muted/30 p-1 rounded transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-1 rounded text-blue-500">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <span>Sacs récupérés</span>
              </div>
              <span className="font-semibold tabular-nums">45</span>
            </div>

            <div className="flex items-center justify-between text-sm group/row hover:bg-muted/30 p-1 rounded transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-1 rounded  text-orange-500">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <span>Sacs restants</span>
              </div>
              <span className="font-semibold tabular-nums">45</span>
            </div>

            <Separator className="bg-border/50 my-1" />

            <div className="flex items-center justify-between text-sm pt-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Banknote className="w-4 h-4 text-destructive" />
                <span className="font-medium text-foreground">
                  Reste à payer
                </span>
              </div>
              <span className="tabular-nums text-muted-foreground">
                5000 BIF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full p-1 lg:p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
        <StatCard
          title="TOTAHAZA"
          icon={Sprout}
          colorClass="bg-emerald-500 text-emerald-600"
          delay="delay-[0ms]"
        />
        <StatCard
          title="IMBURA"
          icon={Sprout}
          colorClass="bg-amber-500 text-amber-600"
          delay="delay-[100ms]"
        />
        <StatCard
          title="BAGARA"
          icon={Sprout}
          colorClass="bg-blue-500 text-blue-600"
          delay="delay-[200ms]"
        />
        <StatCard
          title="DOLOMIE "
          icon={Sprout}
          colorClass="bg-blue-500 text-blue-600"
          delay="delay-[200ms]"
        />
      </div>
    </div>
  );
}
