"use client";
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
const chartData = [
  { type: "TOTAHAZA", visitors: 275, fill: "var(--color-TOTAHAZA)" },
  { type: "IMBURA", visitors: 200, fill: "var(--color-IMBURA)" },
  { type: "BAGARA", visitors: 187, fill: "var(--color-BAGARA)" },
  { type: "DOLOMIE", visitors: 173, fill: "var(--color-DOLOMIE)" },
];
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
            <Pie data={chartData} dataKey="visitors">
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
