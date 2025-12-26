"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A multiple line chart";

// Données pour différentes périodes
const charDataByPeriod = {
  A: [
    { type: "TOTAHAZA", TOTAHAZA: 24 },
    { type: "IMBURA", IMBURA: 24 },
    { type: "BAGARA", BAGARA: 24 },
    { type: "DOLOMIE", DOLOMIE: 24 },
  ],
  B: [
    { type: "TOTAHAZA", TOTAHAZA: 24 },
    { type: "IMBURA", IMBURA: 24 },
    { type: "BAGARA", BAGARA: 24 },
    { type: "DOLOMIE", DOLOMIE: 24 },
  ],
  mois: [
    { month: "January", TOTAHAZA: 186, IMBURA: 80, BAGARA: 15, DOLOMIE: 10 },
    { month: "February", TOTAHAZA: 305, IMBURA: 200, BAGARA: 15, DOLOMIE: 10 },
    { month: "March", TOTAHAZA: 237, IMBURA: 120, BAGARA: 15, DOLOMIE: 10 },
    { month: "April", TOTAHAZA: 73, IMBURA: 190, BAGARA: 15, DOLOMIE: 10 },
    { month: "May", TOTAHAZA: 209, IMBURA: 130, BAGARA: 15, DOLOMIE: 10 },
    { month: "June", TOTAHAZA: 214, IMBURA: 140, BAGARA: 15, DOLOMIE: 10 },
  ],
  annee: [
    { year: "2020", TOTAHAZA: 1000, IMBURA: 500, BAGARA: 15, DOLOMIE: 10 },
    { year: "2021", TOTAHAZA: 1500, IMBURA: 800, BAGARA: 15, DOLOMIE: 10 },
    { year: "2022", TOTAHAZA: 1800, IMBURA: 900, BAGARA: 15, DOLOMIE: 10 },
    { year: "2023", TOTAHAZA: 2100, IMBURA: 1200, BAGARA: 15, DOLOMIE: 10 },
    { year: "2024", TOTAHAZA: 2500, IMBURA: 1400, BAGARA: 15, DOLOMIE: 10 },
  ],
};

const chartConfig = {
  TOTAHAZA: {
    label: "TOTAHAZA",
    color: "var(--chart-5)",
  },
  IMBURA: {
    label: "IMBURA",
    color: "var(--chart-1)",
  },
  BAGARA: {
    label: "BAGARA",
    color: "var(--chart-2)",
  },
  DOLOMIE: {
    label: "DOLOMIE",
    color: "var(--chart-3)",
  },
};
export function ChartLineAchats() {
  const [period, setPeriod] = useState("mois");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes</CardTitle>
        <CardDescription>Filtrer par période</CardDescription>
        <div className="flex flex-row items-center gap-2">
          <Tabs
            defaultValue="mois"
            value={period}
            onValueChange={setPeriod}
            className="w-full mt-4"
          >
            <TabsList className="grid w-max grid-cols-2">
              <TabsTrigger value="mois">Mois</TabsTrigger>
              <TabsTrigger value="annee">Année</TabsTrigger>
              <TabsTrigger value="A" className="hidden">
                A
              </TabsTrigger>
              <TabsTrigger value="B" className="hidden">
                B
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select
            value={["A", "B"].includes(period) ? period : ""}
            onValueChange={setPeriod}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Saison" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Saison</SelectLabel>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={charDataByPeriod[period]}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={
                period === "jour"
                  ? "time"
                  : period === "semaine"
                  ? "day"
                  : period === "mois"
                  ? "month"
                  : period === "annee"
                  ? "year"
                  : "type"
              }
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if (
                  period === "jour" ||
                  period === "semaine" ||
                  period === "annee" ||
                  period === "A" ||
                  period === "B"
                ) {
                  return value;
                }
                return value.slice(0, 3);
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="IMBURA" fill="var(--color-IMBURA)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="TOTAHAZA" fill="var(--color-TOTAHAZA)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="BAGARA" fill="var(--color-BAGARA)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="DOLOMIE" fill="var(--color-DOLOMIE)" radius={8}>
              <LabelList
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
