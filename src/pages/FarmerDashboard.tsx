"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tractor,
  Package,
  DollarSign,
  BarChart,
  ArrowUpRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
];

export default function FarmerDashboard() {
  // Dummy data
  const stats = {
    totalProducts: 24,
    activeOrders: 8,
    monthlySales: 12500000,
    lowStockProducts: 3,
  };

  const recentOrders = [
    {
      id: "#3214",
      product: "Organic Tomatoes",
      buyer: "Budi Santoso",
      amount: "Rp450,000",
      status: "shipped",
    },
    {
      id: "#3215",
      product: "Fresh Strawberries",
      buyer: "Ani Wijaya",
      amount: "Rp620,000",
      status: "processing",
    },
    {
      id: "#3216",
      product: "Hydroponic Lettuce",
      buyer: "Rudi Hermawan",
      amount: "Rp280,000",
      status: "delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back, Farmer! 🌱
          </h1>
          <p className="text-gray-500 mt-2">Your farming business overview</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <Tractor className="w-4 h-4" />
          Add New Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <div className="flex items-center mt-2">
              <Progress
                value={
                  ((stats.totalProducts - stats.lowStockProducts) /
                    stats.totalProducts) *
                  100
                }
                className="h-2"
              />
              <span className="text-xs text-gray-500 ml-2">
                {stats.lowStockProducts} low stock
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <BarChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOrders}</div>
            <div className="text-xs text-gray-500 mt-2">
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp{stats.monthlySales.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              18.2% increase from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Order Fulfillment
            </CardTitle>
            <BarChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="text-xs text-gray-500 mt-2">
              On-time delivery rate
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Sales Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: "#16a34a" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-green-100 rounded-lg mr-3" />
                <div>
                  <div className="font-medium">Organic Tomatoes</div>
                  <div className="text-sm text-gray-500">
                    Vegetables Category
                  </div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">152 sold</Badge>
            </div>
            {/* Repeat similar structure for other products */}
          </div>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "shipped"
                          ? "default"
                          : order.status === "processing"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
