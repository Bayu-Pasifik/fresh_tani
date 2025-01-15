import { getFirestore, addDoc, collection } from "firebase/firestore";

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
