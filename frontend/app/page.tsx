'use client'
import KanbanBoard from "@/components/Board";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
          method: "GET",
          credentials: "include",  // Važno: moraš uključiti kolačiće
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Ako nije autentifikovan
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return <KanbanBoard />;
}
