import { useEffect, useState } from "react";
import { Person } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";
const personUrl = `${baseUrl}/person`;

interface Data {
  people: Person[];
  next: string;
  previous: string;
}

const isData = (arg: any): arg is Data => {
  return (
    arg.people !== undefined &&
    arg.next !== undefined &&
    arg.previous !== undefined &&
    Array.isArray(arg.people)
  );
};

export const useData = (searchTerm: string) => {
  const [fetchUrl, setFetchUrl] = useState<string>(personUrl);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data>({
    people: [],
    next: "",
    previous: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        searchTerm ? `${personUrl}?search=${searchTerm}` : fetchUrl
      );
      const parsed = await result.json();
      if (!isData(parsed)) {
        throw new Error("Invalid data");
      }
      setData(parsed);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchUrl, searchTerm]);

  const onNext = () => {
    setFetchUrl(data.next);
  };
  const onPrevious = () => {
    setFetchUrl(data.previous);
  };
  return { data: data.people, onNext, onPrevious, loading };
};
