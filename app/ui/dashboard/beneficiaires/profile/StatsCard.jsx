import React, { useEffect } from "react";
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
  Handshake,
  Landmark,
  ShoppingBag,
  Truck,
  WalletCards,
} from "lucide-react";
import { fetchData } from "@/app/_utils/api";

function StatsCard({ cult_id }) {
  const [data, setData] = React.useState({});
  useEffect(() => {
    const getCultivators = async () => {
      try {
        const response = await fetchData("get", `/cultivators/${cult_id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        // const cultivatorsData = results.map((cultivator) => ({
        //   id: cultivator.id,
        //   cultivator: {
        //     cultivator_code: cultivator?.cultivator_code,
        //     first_name: cultivator?.cultivator_first_name,
        //     last_name: cultivator?.cultivator_last_name,
        //     image_url: cultivator?.cultivator_photo,
        //   },
        //   hangar_ct: "NGome",
        //   society: "FERTILISANT",
        //   localite: {
        //     province: "Buja",
        //     commune: "Ntahangwa",
        //   },
        //   champs: 4,
        // }));

        setData(response);
        console.log("Cultivators data fetched:", response);
      } catch (error) {
        console.error("Error fetching cultivators data:", error);
      }
    };

    getCultivators();
  }, [cult_id]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-primary p-2 rounded-md">
              <Truck className="text-white" />
            </div>
            <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tracking-tight tabular-nums">
              60 194,59 <span className="text-base">T</span>
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
              78 453 565 <span className="text-xs font-normal ">FBU</span>
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
                453 565{" "}
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
                78 453 565{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  FBU
                </span>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-yellow-500 p-2 rounded-md">
              <Landmark className="text-white" />
            </div>
            <CardTitle className="text-lg text-muted-foreground font-medium tabular-nums  ">
              {data?.cultivator_payment_type}
            </CardTitle>
          </div>
          {data?.cultivator_payment_type === "momo" ? (
            <>
              <CardTitle className="text-xl font-semibold tracking-tight tabular-nums">
                {data?.cultivator_payment_type}
              </CardTitle>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col ">
                  <div className="text-muted-foreground font-medium tabular-nums  ">
                    No compte
                  </div>
                  <div className="text-lg font-semibold tracking-tight tabular-nums">
                    {data?.cultivator_mobile_payment_account}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground font-medium tabular-nums  ">
                    Proprietaire
                  </div>
                  <div className=" font-semibold tracking-tight tabular-nums">
                    {data?.cultivator_account_owner}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <CardTitle className="text-xl font-semibold tracking-tight tabular-nums">
                {data?.cultivator_bank_name}
              </CardTitle>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col ">
                  <div className="text-muted-foreground font-medium tabular-nums  ">
                    No compte
                  </div>
                  <div className="text-lg font-semibold tracking-tight tabular-nums">
                    {data?.cultivator_bank_account}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground font-medium tabular-nums  ">
                    Proprietaire
                  </div>
                  <div className=" font-semibold tracking-tight tabular-nums">
                    {data?.cultivator_account_owner}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}

export default StatsCard;
