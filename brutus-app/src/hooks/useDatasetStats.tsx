import { useEffect, useState } from "react";

export interface DatasetStats {
  totalPeople: number;
  topCities: { name: string; count: number }[];
  averageAge: number;
  topNames: { name: string; count: number }[];
}

const baseUrl = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";
const statsUrl = `${baseUrl}/person-stats`;

export const useDatasetStats = () => {
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(statsUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch dataset stats");
      }

      setStats(await response.json());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, fetchStats };
};
