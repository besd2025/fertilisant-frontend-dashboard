"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SquarePen } from "lucide-react";

export default function Edit({ order }) {
  // local state initialized from props
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState(order?.products || "");
  const [total, setTotal] = React.useState(order?.total || 0);
  const [status, setStatus] = React.useState(order?.status || "draft");
  const [quotaOk, setQuotaOk] = React.useState(order?.quotaOk || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: order?.id,
      products,
      total: parseFloat(total),
      status,
      quotaOk,
    };
    console.log("Submitting Order Update:", formData);
    // In a real app, you would call an API here.
    // For this prototype, we'll just close the modal and maybe reload/alert.
    setOpen(false);
    // window.location.reload(); // Optional: reload to simulate refresh if needed, but not ideal for SPA
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-sm flex items-center gap-2 text-sm pl-2">
          <SquarePen className="h-4 w-4" />
          <span>Modifier</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-sidebar">
        <DialogHeader>
          <DialogTitle>Modification</DialogTitle>
          <DialogDescription>
            Modifier les informations de la commande
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[60vh] lg:max-h-[500px] overflow-y-auto px-2 pb-3">
            <div>
              <h5 className="mb-5 text-xl font-medium text-primary dark:text-white/90 lg:mb-6">
                Code Commande
              </h5>
              <Input type="text" value={order?.id || ""} disabled />
            </div>

            <div className="mt-7">
              <h5 className="mb-5 text-xl font-medium text-primary dark:text-white/90 lg:mb-6">
                Informations Commande
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-2 space-y-2">
                  <Label>Produits</Label>
                  <div className="border rounded-md p-3 bg-muted/20 space-y-2">
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((p, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>
                            {p.name} (x{p.quantity})
                          </span>
                          <span className="text-muted-foreground">
                            {p.price} FBU
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Aucun produit
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                  <Label>Montant Total (FBU)</Label>
                  <Input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                  <Label>Statut</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="paid_advance">
                        Payé (Avance)
                      </SelectItem>
                      <SelectItem value="paid_balance">
                        Payé (Totalité)
                      </SelectItem>
                      <SelectItem value="delivered">Livré</SelectItem>
                      <SelectItem value="closed">Clôturé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* <div className="mt-7">
              <h5 className="mb-5 text-xl font-medium text-primary dark:text-white/90 lg:mb-6">
                Validation
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1 space-y-2 flex flex-col justify-center">
                  <Label className="mb-2">Quota Autorisé</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="quota"
                      checked={quotaOk}
                      onCheckedChange={setQuotaOk}
                    />
                    <Label htmlFor="quota">{quotaOk ? "Oui" : "Non"}</Label>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
