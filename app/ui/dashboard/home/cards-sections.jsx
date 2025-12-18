"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Archive,
  Banknote,
  CircleDollarSign,
  Grape,
  HandCoins,
  Handshake,
  ShoppingBag,
  ShoppingCart,
  Truck,
  WalletCards,
} from "lucide-react";
import { fetchData } from "@/app/_utils/api";
export function SectionCards() {
  const [data, setData] = React.useState(0);
  const [cultivators, setCultivators] = React.useState(0);
  const [montants, setMontants] = React.useState(0);
  React.useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const data = await fetchData(
          "get",
          "fertilisant/commandes/get_total_commandes/",
          {
            params: {},
          }
        );
        const cultivators = await fetchData(
          "get",
          "fertilisant/hangars/get_total_cultivators/",
          {
            params: {},
          }
        );
        const montant = await fetchData(
          "get",
          "fertilisant/commandes/get_total_commandes_montant/",
          {
            params: {},
          }
        );
        setData(data);
        setCultivators(cultivators);
        setMontants(montant);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchSummaryData();
  }, []);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-primary p-2 rounded-md">
              <Truck className="text-white" />
            </div>
            <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tracking-tight tabular-nums">
              {data?.quantite_total >= 1000 ? (
                <>
                  {(data?.quantite_total / 1000).toLocaleString("fr-FR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-base">T</span>
                </>
              ) : (
                <>
                  {data?.quantite_total?.toLocaleString("fr-FR") || 0}{" "}
                  <span className="text-sm">Kg</span>
                </>
              )}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums  ">
            Qte commandées
            <div className="text-sm font-normal text-muted-foreground">
              (toutes variétés)
            </div>
          </CardTitle>
          {/* <CardAction>
            <Badge variant="secondary">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex flex-row items-center justify-between text-sm ">
          <div className="ml-2 flex flex-col gap-y-1">
            <div className="flex flex-row gap-x-2 items-center bg-secondary/10 py-1 px-2 rounded-lg">
              <div className="flex flex-row gap-x-1 items-center">
                <ShoppingBag className="text-secondary size-5" />
                <CardTitle className="text-md font-semibold text-secondary">
                  Sacs :
                </CardTitle>
              </div>
              <CardDescription className="font-semibold text-accent-foreground text-lg">
                20,59
              </CardDescription>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card ">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-secondary p-2 rounded-md">
              <HandCoins className="text-white" />
            </div>
            <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tracking-tight tabular-nums">
              {cultivators?.total_cultivators}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums  ">
            Beneficiaires
          </CardTitle>
          {/* <CardAction>
            <Badge variant="secondary">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
      </Card>
      <Card className="@container/card bg-primary text-primary-foreground">
        <CardHeader className="bg-primary">
          <div className="flex flex-col  mt-2">
            <div className="flex flex-row gap-x-2 items-center">
              <div className="rounded-md">
                <CircleDollarSign className="text-yellow-500 size-4" />
              </div>
              <CardTitle className="text-sm  font-medium tabular-nums">
                MONTANT
              </CardTitle>
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight tabular-nums">
              {(montants?.avance_montant + montants?.reste_a_payer ?? 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              <span className="text-xs font-normal ">FBU</span>
            </CardTitle>
          </div>
          <div className="flex flex-col  bg-sidebar text-primary dark:text-primary-foreground   px-4 py-2 rounded-tl-lg rounded-tr-lg">
            <div className="">
              <div className="flex flex-row gap-x-2 items-center">
                <div className="rounded-md">
                  <Handshake className="text-yellow-500 size-4" />
                </div>
                <CardTitle className="text-xs text-muted-foreground font-medium tabular-nums">
                  AVANCE
                </CardTitle>
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight tabular-nums">
                {(montants?.avance_montant ?? 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  FBU
                </span>
              </CardTitle>
            </div>
            <div className="flex flex-col mt-1">
              <div className="flex flex-row gap-x-2 items-center">
                <div className="rounded-md">
                  <WalletCards className="text-yellow-500 size-4" />
                </div>
                <CardTitle className="text-xs text-muted-foreground font-medium tabular-nums">
                  RESTANT
                </CardTitle>
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight tabular-nums">
                {(montants?.reste_a_payer ?? 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  FBU
                </span>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
