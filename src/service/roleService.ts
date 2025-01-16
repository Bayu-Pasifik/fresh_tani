import { getFirestore, addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";
export const requestRole = async ({
  userId,
  email,
  currentRoles,
  requestedRole,
}: {
  userId: string;
  email: string;
  currentRoles: string[];
  requestedRole: string;
}) => {
  if (currentRoles.includes(requestedRole)) {
    throw new Error("Anda sudah memiliki role ini.");
  }

  const db = getFirestore();

  await addDoc(collection(db, "roleRequests"), {
    userId,
    email,
    currentRoles,
    requestedRole,
    status: "pending",
    createdAt: new Date(),
  });
};



export function ManageRequests() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "roleRequests"));
      setRequests(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchRequests();
  }, []);

  const handleApprove = async (request: any) => {
    const db = getFirestore();
    try {
      const userRef = doc(db, "users", request.userId);
      await updateDoc(userRef, {
        roles: [...request.currentRoles, request.requestedRole],
      });

      const requestRef = doc(db, "roleRequests", request.id);
      await updateDoc(requestRef, { status: "approved" });

      Swal.fire("Success", "Role request approved.", "success");
      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id ? { ...r, status: "approved" } : r
        )
      );
    } catch (error) {
      Swal.fire("Error", "Failed to approve request. Please try again.", "error");
    }
  };

  const handleReject = async (request: any) => {
    const db = getFirestore();
    try {
      const requestRef = doc(db, "roleRequests", request.id);
      await updateDoc(requestRef, { status: "rejected" });

      Swal.fire("Success", "Role request rejected.", "success");
      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id ? { ...r, status: "rejected" } : r
        )
      );
    } catch (error) {
      Swal.fire("Error", "Failed to reject request. Please try again.", "error");
    }
  };

  return {
    requests,
    handleApprove,
    handleReject,
  };
}
