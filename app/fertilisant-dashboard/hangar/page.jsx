import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartColumn, List } from "lucide-react";
import HangarsListTable from "@/app/ui/dashboard/hangar/list";
import HangarAnalytics from "@/app/ui/dashboard/hangar/analytics";

function page() {
  return (
    <div className="p-4">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="w-full h-10 lg:w-[50%]">
          <TabsTrigger value="list">
            <List />
            <span>Liste</span>
          </TabsTrigger>
          <TabsTrigger value="details">
            <ChartColumn />
            <span>Details</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <h1 className="text-2xl font-semibold m-2">
            Liste des Station de Lavage
          </h1>
          <HangarsListTable />
        </TabsContent>
        <TabsContent value="details">
          <HangarAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
