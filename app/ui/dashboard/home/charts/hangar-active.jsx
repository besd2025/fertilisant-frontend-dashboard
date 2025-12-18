"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchData } from "@/app/_utils/api";
export const description = "A pie chart with a label list";
const chartConfig = {
  visitors: {
    label: "Quantité",
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
};

export function ChartPieHangarCtActive() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        const results = await fetchData(
          "get",
          "fertilisant/commandes/get_total_quantite_par_commande_type/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const chartData = [
          {
            type: "TOTAHAZA",
            visitors: results?.total_commandes_urea,
            fill: "var(--color-TOTAHAZA)",
          },
          {
            type: "IMBURA",
            visitors: results?.total_commandes_imbura,
            fill: "var(--color-IMBURA)",
          },
          {
            type: "BAGARA",
            visitors: results?.total_commandes_bagara,
            fill: "var(--color-BAGARA)",
          },
          {
            type: "DOLOMIE",
            visitors: results?.total_commandes_dolomie,
            fill: "var(--color-DOLOMIE)",
          },
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Comparatif des commandes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={data} dataKey="visitors">
              <LabelList
                dataKey="type"
                className="text-sidebar-foreground"
                stroke="none"
                fontSize={12}
                formatter={(value) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
