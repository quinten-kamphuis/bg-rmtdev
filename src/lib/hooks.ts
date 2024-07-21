import { useState, useEffect, useContext } from "react";
import { JobItemContentType, JobItemType, SortByType } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

const fetchJobItem = async (id: number): Promise<JobItemContentType> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if(!response.ok) {
    const error = await response.json();
    throw new Error("An error occurred while fetching the job item content: " + error.message);
  }
  const data = await response.json();
  return data.jobItem;
}

export const useJobItem = (id: number | null) => {

  const { data, isInitialLoading } = useQuery(
    ["jobItem", id],
    () => id ? fetchJobItem(id) : null,
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,  
      retry: false,
      onError: (error) => handleError(error)
    }
  );

  return [(data as JobItemContentType | null), isInitialLoading] as const;
}

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["jobItem", id],
      queryFn: () => fetchJobItem(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error: unknown) => handleError(error)
    }))
  });
  const jobItems = results
    .map((result) => result.data)
    .filter(jobItem => jobItem !== undefined) as JobItemContentType[];
  const isLoading = results.some((result) => result.isLoading);

  return [(jobItems as JobItemContentType[]), isLoading] as const;
}

const fetchJobItems = async (searchTerm: string): Promise<JobItemType[]> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchTerm}`);
  if(!response.ok) {
    const error = await response.json();
    throw new Error("An error occurred while fetching the job items: " + error.message);
  }
  const data = await response.json();
  return data.jobItems;
}

export const useSearchQuery = (searchTerm: string, sortBy: SortByType) => {
  const { data, isInitialLoading } = useQuery(
    ["jobItems", searchTerm],
    () => fetchJobItems(searchTerm),
    {
      enabled: !!searchTerm, 
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error) => handleError(error)
    }
  );
  const sortedData = data?.sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  })
  return [(sortedData as JobItemType[] | null), isInitialLoading] as const;
}

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
    
  }, [value, delay]);

  return debouncedValue;
}

export const useActiveJobItemId = () => {
  const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = parseInt(window.location.hash.slice(1));
      setActiveJobItemId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

return activeJobItemId;
}

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}


export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};