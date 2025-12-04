"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle2, XCircle } from "lucide-react";

export function HangarSummaryCards() {
  const totalHangar = 150;
  const activeHangar = 120;
  const inactiveHangar = 30;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex flex-row gap-x-2 items-center">
            <div className="bg-primary p-2 rounded-md">
              <Building2 className="text-white" />
            </div>
            <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tracking-tight tabular-nums ml-2">
              {totalHangar}
            </CardTitle>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums ml-2">
            Effectif Total des HANGARs
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className=" font-medium">Actifs</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeHangar.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {((activeHangar / totalHangar) * 100).toFixed(1)}% du total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="font-medium">Inactifs</CardTitle>
          <XCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {inactiveHangar.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {((inactiveHangar / totalHangar) * 100).toFixed(1)}% du total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
