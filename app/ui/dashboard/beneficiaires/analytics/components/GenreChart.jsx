"use client";
import React from "react";
import { fetchData } from "@/app/_utils/api";
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
export const description = "A pie chart with a label list";

const chartConfig = {
  visitors: {
    label: "Beneficiaires",
  },
  hommes: {
    label: "Hommes",
    color: "var(--chart-1)",
  },
  femmes: {
    label: "Femmes",
    color: "var(--chart-5)",
  },
};

export function GenreChart() {
  const [data, setData] = React.useState(0);
  React.useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetchData(
          "get",
          "fertilisant/hangars/get_total_cultivators/",
          {
            params: {},
          }
        );
        const chartData = [
          {
            browser: "Homme",
            visitors: response?.hommes,
            fill: "var(--color-hommes)",
          },
          {
            browser: "Femme",
            visitors: response.femmes,
            fill: "var(--color-femmes)",
          },
        ];
        setData(chartData);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchSummaryData();
  }, []);
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Répartition par Genre</CardTitle>
        <CardDescription>Hommes vs Femmes</CardDescription>
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
                dataKey="browser"
                className="fill-background"
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
