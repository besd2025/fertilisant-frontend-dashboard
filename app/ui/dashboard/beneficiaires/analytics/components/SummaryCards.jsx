"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, User, Grape } from "lucide-react";
import { fetchData } from "@/app/_utils/api";
export function SummaryCards() {
  const [Cultivators, setCultivators] = React.useState(0);
  React.useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const data = await fetchData(
          "get",
          "fertilisant/hangars/get_total_cultivators/",
          {
            params: {},
          }
        );

        setCultivators(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchSummaryData();
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-primary p-2 rounded-md">
              <Users className="text-white" />
            </div>
            <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tracking-tight tabular-nums ml-2">
              {Cultivators?.total_cultivators}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums ml-2">
            Total Beneficiaires
          </CardTitle>
          {/* <CardAction>
            <Badge variant="secondary">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className=" font-medium">Hommes</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Cultivators?.hommes}</div>
          <p className="text-xs text-muted-foreground">
            {(
              (Cultivators?.hommes / Cultivators?.total_cultivators || 1) * 100
            ).toFixed(1)}
            % du total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="font-medium">Femmes</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Cultivators?.femmes}</div>
          <p className="text-xs text-muted-foreground">
            {(
              (Cultivators?.femmes / Cultivators?.total_cultivators || 1) * 100
            ).toFixed(1)}
            % du total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
