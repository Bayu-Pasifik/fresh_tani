"use client";

import { ManageRequests } from "@/service/roleService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const AdminManageRequests: React.FC = () => {
  const { requests, handleApprove, handleReject } = ManageRequests();

  if (!requests || requests.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Manage Role Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No pending requests at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Navbar />
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>Manage Role Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Requested Role</TableHead>
                <TableHead>Current Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.email}</TableCell>
                  <TableCell>{request.requestedRole}</TableCell>
                  <TableCell>{request.currentRoles.join(", ")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "pending"
                          ? "outline"
                          : request.status === "approved"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};
