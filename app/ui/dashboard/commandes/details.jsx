"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Eye,
  DollarSign,
  Calendar,
  MapPin,
  Package,
  User,
  QrCode,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ViewImageDialog from "@/components/ui/view-image-dialog";

export default function Details({ order }) {
  const [open, setOpen] = React.useState(false);

  if (!order) return null;

  const { id, date, beneficiary, products, total, status, quotaOk } = order;

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid_advance":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Payé (Avance)
          </Badge>
        );
      case "paid_balance":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
            Payé (Totalité)
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Livré
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-sm flex items-center gap-2 text-sm pl-2">
          <Eye className="h-4 w-4" />
          <span>Détails</span>
        </div>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar  max-h-[90vh] sm:max-w-[700px] overflow-y-auto bg-sidebar">
        <DialogHeader>
          <div className="flex items-center justify-between mr-8">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Commande {id}
            </DialogTitle>
            {getStatusBadge(status)}
          </div>
          <DialogDescription className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Beneficiary Section */}
          <div className="space-y-4 col-span-2">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
              <User className="h-5 w-5" /> Bénéficiaire
            </h3>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {beneficiary?.avatar ? (
                    <ViewImageDialog
                      imageUrl={beneficiary?.avatar}
                      className="size-full object-cover"
                    />
                  ) : (
                    beneficiary?.name?.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-medium text-lg">{beneficiary?.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <QrCode className="h-3 w-3" />
                    <span>5045-544-85</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {beneficiary?.zone}/{beneficiary?.zone}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-4 col-span-2">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
              <Package className="h-5 w-5" /> Produits
            </h3>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="space-y-3">
                {Array.isArray(products) ? (
                  products.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b last:border-0 pb-2 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qté: {product.quantity}
                        </p>
                      </div>
                      <div className="font-medium">
                        {product.price?.toLocaleString()} FBU
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Aucun produit</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financials */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
              <DollarSign className="h-5 w-5" /> Paiement
            </h3>
            <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col items-cent/er justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-green-600">
                {total?.toLocaleString()} FBU
              </span>
              <div className="">
                <p className="text-sm text-muted-foreground">
                  Avance: 54500 FBU
                </p>
                <p className="text-sm text-muted-foreground">
                  Restant: 54500 FBU
                </p>
              </div>
            </div>
          </div>

          {/* Status & Quota */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
              Qr Code
            </h3>
            {/* <div className="bg-card p-4 rounded-lg border shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Quota status</span>
                <Badge
                  variant={quotaOk ? "success" : "destructive"}
                  className={
                    quotaOk
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {quotaOk ? "Autorisé" : "Dépassé"}
                </Badge>
              </div>
            </div> */}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
