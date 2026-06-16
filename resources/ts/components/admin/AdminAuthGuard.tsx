import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface GuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: GuardProps) {
  const { isPending, isError } = useQuery({
    queryKey: ["admin", "me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      return res.json();
    },
    retry: false,
  });

  if (isPending) return null;

  if (isError) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
