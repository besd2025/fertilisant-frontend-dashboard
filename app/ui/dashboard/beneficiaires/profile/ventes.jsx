"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ViewImageDialog from "@/components/ui/view-image-dialog";
import PaginationControls from "@/components/ui/pagination-controls";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";
import { Handshake, Truck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { fetchData } from "@/app/_utils/api";
const products = [
  {
    id: 101,
    date: "12/8/2025",
    hangar_name: "Ngome",
    No_recus: 4.5,
    TOTAHAZA: 452,
    IMBURA: 52,
    BAGARA: 0,
    DOLOMITE: 9,
    recus_photo: "/images/logo_1.jpg",
    montant: 5555555,
    avance: 555,
  },
];

export default function Ventes() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const totalItems = products.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedProducts = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [page, pageSize]);

  React.useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const data = await fetchData(
          "get",
          `cultivators/${id}/get_cultivateur_avec_liste_command_angrais/`,
          {
            params: {},
          }
        );

        setData(data.results);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchSummaryData();
  }, [id]);
  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Date de commande</TableHead>
              <TableHead>HANGAR</TableHead>

              <TableHead>TYPE</TableHead>
              <TableHead>Sacs</TableHead>
              <TableHead>Recus</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Avance</TableHead>
              <TableHead className="sticky right-0 bg-sidebar border-l">
                Statut
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product, i = 0) => (
              <TableRow key={i + 1} className="odd:bg-muted/50">
                <TableCell className="pl-4">{product.id}</TableCell>
                <TableCell className="font-medium">
                  {product?.date_enregistrement}
                </TableCell>
                <TableCell>{product.hangar_name}</TableCell>
                <TableCell>{product.angrais_type}</TableCell>
                <TableCell>{product.nombre_sacs}</TableCell>
                {/* <TableCell>{product.IMBURA}</TableCell>
                <TableCell>{product.BAGARA}</TableCell>
                <TableCell>{product.DOLOMITE}</TableCell> */}
                <TableCell>
                  <ViewImageDialog
                    imageUrl={product.recus_photo}
                    profile={false}
                  />
                </TableCell>
                <TableCell>
                  {product.avance_montant + product?.reste_a_payer} Fbu
                </TableCell>
                <TableCell>{product.avance_montant} Fbu</TableCell>
                <TableCell className="sticky right-0 bg-sidebar border-l-2 border-background ">
                  <Badge variant="secondary">
                    <Truck />
                    En cours
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        className="mt-4"
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPage(1);
          setPageSize(size);
        }}
        hasNextPage={page < totalPages}
        hasPreviousPage={page > 1}
      />
    </div>
  );
}
