"use client";

import React from "react";
import { HangarSummaryCards } from "./components/HangarSummaryCards";
import { HangarActiveChart } from "./components/HangarActiveChart";
import { HangarLocationChart } from "./components/HangarLocationChart";
import { HangarTypeChart } from "./components/HangarTypeChart";
import { HangarTopFiveCards } from "./components/HangarTopFiveCards";

export default function HangarAnalytics() {
  return (
    <div className="lg:p-4 space-y-6 bg-muted/10 min-h-screen">
      {/* Top Cards */}
      <HangarSummaryCards />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* Pie Chart: Active vs Non-Active */}
        <HangarActiveChart />

        {/* Pie Chart: Private vs Public */}
        <HangarTypeChart />

        {/* Placeholder for layout balance or another chart if needed. 
            Since we have 7 cols, and 2 charts taking 2 cols each (total 4), 
            we have 3 cols left. Maybe HangarLocationChart can take 3 cols? 
            Or we can adjust the grid. 
            Cultivators had: GenreChart (2), RegistrationChart (line, probably 5?).
            Here we have 2 pies and 1 bar.
            Let's put the two pies side by side (2+2) and maybe the bar chart below or next to them.
            Let's try: Row 1: Active (3), Type (3). Row 2: Location (full width or half).
            
            Let's stick to the grid:
            Row 1: Active (2), Type (2), Location (3).
        */}
        <div className="col-span-1 lg:col-span-3">
          <HangarLocationChart />
        </div>
      </div>

      {/* Top 5 Cards */}
      <HangarTopFiveCards />
    </div>
  );
}
