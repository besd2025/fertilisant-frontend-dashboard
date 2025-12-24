"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import PaginationControls from "@/components/ui/pagination-controls"; // Assuming this exists from previous listing

export function OrdersTable() {
  // Dummy Data
  const orders = [
    {
      id: "#CMD-001",
      date: "2023-10-25 14:30",
      beneficiary: { name: "Jean Dupont", avatar: "JD", zone: "Zone 1" },
      products: "NPK 17-17-17 (2 sacs)",
      total: 50000,
      status: "confirmed",
      quotaOk: true,
    },
    {
      id: "#CMD-002",
      date: "2023-10-24 09:15",
      beneficiary: { name: "Marie Curie", avatar: "MC", zone: "Zone 2" },
      products: "Urée (3 sacs)",
      total: 75000,
      status: "paid_advance",
      quotaOk: true,
    },
    {
      id: "#CMD-003",
      date: "2023-10-23 16:45",
      beneficiary: { name: "Paul Martin", avatar: "PM", zone: "Zone 1" },
      products: "DAP (10 sacs)",
      total: 250000,
      status: "draft",
      quotaOk: false,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "draft":
        return (
          <span className="bg-gray-100/50 border border-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
            Brouillon
          </span>
        );
      case "confirmed":
        return (
          <span className="bg-yellow-100/50 border border-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Confirmé
          </span>
        );
      case "paid_advance":
        return (
          <span className="bg-blue-100/50 border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
            Payé (Avance)
          </span>
        );
      case "paid_balance":
        return (
          <span className="bg-indigo-100/50 border border-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full">
            Payé (Solde)
          </span>
        );
      case "delivered":
        return (
          <span className="bg-green-100/50 border border-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
            Livré
          </span>
        );
      case "closed":
        return (
          <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
            Clôturée
          </span>
        );
      default:
        return status;
    }
  };

  const currentTime = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Table Container with Horizontal Scroll */}
      <div className="rounded-md border bg-card overflow-x-auto">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead>ID Commande</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Bénéficiaire</TableHead>
              <TableHead>Produits</TableHead>
              <TableHead>Montant (FBU)</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-center">Quota</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {order.beneficiary.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {order.beneficiary.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.beneficiary.zone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.products}</TableCell>
                <TableCell>{order.total.toLocaleString()} FBU</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-center">
                  {order.quotaOk ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Voir détails</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Télécharger Facture</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pied de Page */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg border">
        <div className="flex items-center gap-4">
          <span>
            Total lignes affichées:{" "}
            <span className="font-semibold text-foreground">
              {orders.length}
            </span>
          </span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Mis à jour: {currentTime}
          </span>
        </div>

        {/* Mock Pagination - In real implementation, use PaginationControls */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <div className="text-xs">Page 1 sur 5</div>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
