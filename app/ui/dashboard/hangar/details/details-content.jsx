"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchData } from "@/app/_utils/api";
import EditHistory from "./edit-history";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartNoAxesCombined,
  History,
  MapPinHouse,
  MoreHorizontal,
  ScrollText,
  ShoppingCart,
  Spline,
  Truck,
  Users,
} from "lucide-react";
import CultivatorsListTable from "../../beneficiaires/list";
import Achats from "./achats/achats";
import TransferHangarDep from "./tranfer/transfer-sdl";
import ReceiptHangarCt from "./receipt/receipt-sdl";
import RedementC from "./rendement";
import RHlist from "./RH";
import { Button } from "@/components/ui/button";

function DetailsContent({ id }) {
  const transferData = [
    {
      id: "cultivator_001",
      from_sdl: "Ngome",
      to_depulpeur_name: "NGANE",
      society: "ODECA",
      qte_tranferer: {
        ca: 78452,
        cb: 741,
      },
      photo_fiche: "/images/logo_1.jpg",
      localite: {
        province: "Buja",
        commune: "Ntahangwa",
      },
    },
  ];
  const RHData = [
    {
      id: "cultivator_001",
      cultivator: {
        cultivator_code: "2530-522-7545",
        first_name: "Brave",
        last_name: "Eddy",
        image_url: "/images/logo_1.jpg",
      },
      cni: "74/565",
      ca: 78,
      ca_price: 7855,
      cb: 785,
      cb_price: 4544,
      qte_total: 555,
      total_price: 457,
    },
  ];
  const [tab, setTab] = useState("cultivators");

  const [data, setData] = React.useState([]);
  const [commandeData, setCommandeData] = React.useState([]);
  React.useEffect(() => {
    const getCultivators = async () => {
      try {
        const response = await fetchData(
          "get",
          `fertilisant/hangars/${id}/get_all_paginated_cultivators_per_hangar/`,
          { params: { limit: 1000, offset: 0 } }
        );
        const results = response?.results;
        const cultivatorsData = results?.map((cultivator) => ({
          id: cultivator?.id,
          cultivator: {
            cultivator_code: cultivator?.cultivator_code,
            first_name: cultivator?.cultivator_first_name,
            last_name: cultivator?.cultivator_last_name,
            image_url: cultivator?.cultivator_photo,
          },
          sdl_ct: "NGome",
          society: "ODECA",
          localite: {
            province:
              cultivator?.cultivator_adress?.zone_code?.commune_code
                ?.province_code?.province_name,
            commune:
              cultivator?.cultivator_adress?.zone_code?.commune_code
                ?.commune_name,
          },
          champs: 4,
        }));

        setData(cultivatorsData);
      } catch (error) {
        console.error("Error fetching cultivators data:", error);
      }
    };
    const getCommandes = async () => {
      try {
        const response = await fetchData(
          "get",
          `fertilisant/hangars/${id}/get_all_paginated_command_per_hangar/`,
          { params: { limit: 1000, offset: 0 } }
        );
        const results = response?.results;
        const AchatsHANGARCommandes = results?.map((commande) => ({
          id: commande?.id,
          cultivator: {
            cultivator_code: commande?.cultivator?.cultivator_code,
            first_name: commande?.cultivator?.cultivator_first_name,
            last_name: commande?.cultivator?.cultivator_last_name,
            image_url: commande?.cultivator?.cultivator_photo,
          },
          localite: {
            province:
              commande?.cultivator?.cultivator_adress?.zone_code?.commune_code
                ?.province_code?.province_name,
            commune:
              commande?.cultivator?.cultivator_adress?.zone_code?.commune_code
                ?.commune_name,
          },
          photo_recu: commande?.recu_paiement,
          ca: commande?.angrais_type,
          cb: commande?.nombre_sacs,
          avance: commande?.avance_montant,
          date: commande?.date_enregistrement,
        }));
        setCommandeData(AchatsHANGARCommandes);
        console.log("Formatted Commandes Data:", AchatsHANGARCommandes);
      } catch (error) {
        console.error("Error fetching cultivators data:", error);
      }
    };
    getCommandes();
    getCultivators();
  }, [id]);

  return (
    <Card className="p-2 space-y-4 rounded-xl shadow-sm">
      <Tabs value={tab} className="space-y-6 w-full" onValueChange={setTab}>
        {/* TABS LIST */}
        <TabsList className="overflow-x-auto flex-nowrap gap-2 w-full">
          <TabsTrigger value="cultivators" className="shrink-0">
            <Users className="w-4 h-4" /> Beneficiaires
          </TabsTrigger>

          <TabsTrigger value="achats" className="shrink-0">
            <Truck className="w-4 h-4" /> Commandes collectees
          </TabsTrigger>

          {/* Hidden on Mobile */}

          <TabsTrigger value="maps" className="hidden lg:flex shrink-0">
            <MapPinHouse className="w-4 h-4" /> Map
          </TabsTrigger>

          {/* MOBILE DROPDOWN */}
          <div className="block lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>

                <DropdownMenuItem onClick={() => setTab("achats")}>
                  <Truck className="w-4 h-4" /> Commandes collectees
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTab("cultivators")}>
                  <Users className="w-4 h-4" /> Beneficiaires
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setTab("maps")}>
                  <MapPinHouse className="w-4 h-4" /> Map
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TabsList>
        <TabsContent value="cultivators">
          <h1 className="text-xl font-semibold m-2">Liste des Beneficiaires</h1>
          <CultivatorsListTable data={data} isCultivatorsPage={false} />
        </TabsContent>
        <TabsContent value="achats">
          <h1 className="text-xl font-semibold m-2">Achats effectues</h1>
          <Achats data={commandeData} />
        </TabsContent>

        <TabsContent value="maps">En cours...</TabsContent>
        {/* <TabsContent value="transferHangar">
        <h1 className="text-xl font-semibold m-2">Transfers effectues</h1>
        <TransferHangarDep data={transferData} />
      </TabsContent> */}
        <TabsContent value="receptionHangar">
          <h1 className="text-xl font-semibold m-2">Receptions</h1>
          <ReceiptHangarCt data={transferData} />
        </TabsContent>
        <TabsContent value="rendement">
          <h1 className="text-xl font-semibold m-2">Rendements Cerise</h1>
          <RedementC />
        </TabsContent>
        <TabsContent value="rh">
          <h1 className="text-xl font-semibold m-2">Rapport H</h1>
          <RHlist data={RHData} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default DetailsContent;
