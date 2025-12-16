import React from "react";
import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Ventes from "./ventes";
import EditHistory from "./edit-history";
import { BookCheck, History, MapPinHouse, ShoppingCart } from "lucide-react";

function ActivityList({ items }) {
  return (
    <Card className="p-2 space-y-4 rounded-xl shadow-sm">
      <Tabs defaultValue="ventes" className="space-y-6 w-full ">
        <TabsList className=" w-full h-max">
          <TabsTrigger value="ventes">
            <ShoppingCart /> Commandes effectues
          </TabsTrigger>
          <TabsTrigger value="livres">
            <BookCheck /> Commandes livrées
          </TabsTrigger>
          <TabsTrigger value="maps">
            <MapPinHouse /> Map
          </TabsTrigger>
          <TabsTrigger value="edits">
            <History /> Historique des modifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ventes">
          <Ventes />
        </TabsContent>
        <TabsContent value="edits">
          <EditHistory />
        </TabsContent>
        <TabsContent value="maps">En cours...</TabsContent>
      </Tabs>
    </Card>
  );
}

export default ActivityList;
