"use client";

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

const chartData = [
  {
    location: "KAYANZA",
    commandes: 186,
    TOTAHAZA: 8,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
  {
    location: "GITEGA",
    commandes: 305,
    TOTAHAZA: 20,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
  {
    location: "KARUSI",
    commandes: 237,
    TOTAHAZA: 120,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
  {
    location: "MUYINGA",
    commandes: 73,
    TOTAHAZA: 190,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
  {
    location: "MAKAMBA",
    commandes: 209,
    TOTAHAZA: 130,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
  {
    location: "KIRUNDO",
    commandes: 214,
    TOTAHAZA: 140,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
  {
    location: "MUYINGA",
    commandes: 73,
    TOTAHAZA: 190,
    IMBURA: 120,
    BAGARA: 20,
    DOLOMIE: 10,
  },
];

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes par localite</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px]">
          <BarChart
            accessibilityLayer
            data={chartData}
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
