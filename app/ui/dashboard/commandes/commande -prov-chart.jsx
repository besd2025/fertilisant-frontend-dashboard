"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";
import { fetchData } from "@/app/_utils/api";

const chartConfig = {
  commandes: {
    label: "commandes",
    color: "var(--chart-1)",
  },
  TOTAHAZA: {
    label: "TOTAHAZA",
    color: "var(--chart-2)",
  },
  IMBURA: {
    label: "IMBURA",
    color: "var(--chart-3)",
  },
  BAGARA: {
    label: "BAGARA",
    color: "var(--chart-4)",
  },
  DOLOMIE: {
    label: "DOLOMIE",
    color: "var(--chart-5)",
  },
  label: {
    color: "var(--background)",
  },
};

export function CommandeProv() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const getCommandes = async () => {
      try {
        const response = await fetchData(
          "get",
          `fertilisant/commandes/get_commande_par_provinces/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const commanddata = response?.map((commande) => ({
          location: commande?.province_name,
          commandes:
            commande?.totahaza +
            commande?.imbura +
            commande?.bagara +
            commande?.dolomie,
          TOTAHAZA: commande?.totahaza,
          IMBURA: commande?.imbura,
          BAGARA: commande?.bagara,
          DOLOMIE: commande?.dolomie,
        }));
        setData(commanddata);
      } catch (error) {
        console.error("Error fetching Commandes data:", error);
      }
    };
    getCommandes();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes par localite</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px]">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 25,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="location"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="TOTAHAZA"
              stackId="a"
              fill="var(--color-TOTAHAZA)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="IMBURA"
              stackId="a"
              fill="var(--color-IMBURA)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="BAGARA"
              stackId="a"
              fill="var(--color-BAGARA)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="DOLOMIE"
              stackId="a"
              fill="var(--color-DOLOMIE)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="commandes"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
