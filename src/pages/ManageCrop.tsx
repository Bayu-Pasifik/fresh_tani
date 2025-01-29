"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ManageCropsPage() {
  // Dummy data untuk preview UI
  const dummyCrops = [
    {
      id: "1",
      name: "Tomato",
      price: 15000,
      stock: 50,
      status: "Available",
    },
    {
      id: "2",
      name: "Strawberry",
      price: 25000,
      stock: 0,
      status: "Out of Stock",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-600">Manage Crops</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          Add New Crop
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyCrops.map((crop) => (
            <TableRow key={crop.id}>
              <TableCell>{crop.name}</TableCell>
              <TableCell>Rp{crop.price.toLocaleString()}</TableCell>
              <TableCell>{crop.stock} kg</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    crop.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {crop.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-green-600 hover:bg-green-50"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog untuk Add New Crop */}
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Crop</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Product Name" />
            <Input placeholder="Price" type="number" />
            <Input placeholder="Stock" type="number" />
            <Input placeholder="Description" />
          </div>
          <DialogFooter>
            <Button className="bg-green-600 hover:bg-green-700">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
