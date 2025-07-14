import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { staticCMSData } from "../data/cms-data";

export interface CMSItem {
  id: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface CMSMedia {
  url: string;
  alt_text: string;
  mime_type: string;
}

export interface CMSPrice {
  amount: number;
  currency: string;
}

export interface CMSDataOptions {
  page?: number;
  pageSize?: number;
  filters?: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CMSQueryResult<T = CMSItem> {
  data: T[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
  isSuccess?: boolean;
  isError?: boolean;
}

export interface CMSItemResult<T = CMSItem> {
  data: T | null | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
  isSuccess?: boolean;
  isError?: boolean;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.intuitiverse.com";
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

async function apiCall(endpoint: string, params?: Record<string, unknown>) {
  const url = new URL(`${API_BASE_URL}/projects/${PROJECT_ID}/cms${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function apiPost(endpoint: string, body: unknown) {
  const url = `${API_BASE_URL}/projects/${PROJECT_ID}/cms${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

function applyFiltersAndSort<T extends CMSItem>(
  data: T[],
  options: CMSDataOptions
): T[] {
  let result = [...data];

  if (options.filters) {
    result = result.filter((item) => {
      return Object.entries(options.filters!).every(([key, value]) => {
        if (value === null || value === undefined) return true;

        const itemValue = item[key];

        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          return itemValue === value;
        }

        return String(itemValue) === String(value);
      });
    });
  }

  if (options.sortBy) {
    result.sort((a, b) => {
      const aValue = a[options.sortBy!];
      const bValue = b[options.sortBy!];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return options.sortOrder === "desc" ? -comparison : comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return options.sortOrder === "desc" ? -comparison : comparison;
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return options.sortOrder === "desc" ? -comparison : comparison;
    });
  }

  if (options.page && options.pageSize) {
    const startIndex = (options.page - 1) * options.pageSize;
    const endIndex = startIndex + options.pageSize;
    result = result.slice(startIndex, endIndex);
  }

  return result;
}

export function useCMSData<T extends CMSItem = CMSItem>(
  collection: string,
  options: CMSDataOptions = {},
  initialData?: T[]
): CMSQueryResult<T> {
  const isDevelopment = process.env.NEXT_PUBLIC_MODE === "development";
  const staticData = (staticCMSData[collection] || []) as unknown as T[];
  const devMode = isDevelopment && !!PROJECT_ID && !!ACCESS_TOKEN;

  const queryResult = useQuery({
    queryKey: ["cms-data", collection, options],
    queryFn: async (): Promise<T[]> => {
      console.log(`Fetching CMS data for collection: ${collection}`);

      try {
        const response = await apiCall(`/collections/${collection}`, {
          page: options.page,
          pageSize: options.pageSize,
          sortBy: options.sortBy,
          sortOrder: options.sortOrder,
          ...options.filters,
        });

        console.log(
          `Successfully fetched ${
            response.data?.length || 0
          } items from ${collection}`
        );
        return response.data || [];
      } catch (error) {
        console.error(`Error fetching CMS data for ${collection}:`, error);
        const filteredData = applyFiltersAndSort(staticData, options);
        return filteredData;
      }
    },
    refetchOnWindowFocus: false,
    enabled: devMode,
  });

  if (devMode) {
    return queryResult as CMSQueryResult<T>;
  }

  const filteredData = applyFiltersAndSort(staticData, options);

  return {
    data: filteredData,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
    isSuccess: true,
    isError: false,
  };
}

/**
 * Hook to create CMS items (forms, contacts, etc.)
 * Follows the standard react-query mutation pattern
 */
export function useCreateCMSItem<T extends CMSItem = CMSItem>(
  collection: string
): UseMutationResult<
  T,
  Error,
  Omit<T, "id" | "created_at" | "updated_at">,
  unknown
> & { isLoading: boolean } {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: Omit<T, "id" | "created_at" | "updated_at">
    ): Promise<T> => {
      console.log(`Creating new item in collection: ${collection}`, data);

      try {
        const response = await apiPost(`/collections/${collection}`, data);
        console.log(`Successfully created item in ${collection}:`, response);
        return response as T;
      } catch (error) {
        console.error(`Error creating item in ${collection}:`, error);
        throw error;
      }
    },
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({
        queryKey: ["cms-data", collection],
      });

      console.log(`Cache updated for collection: ${collection}`);
    },
    onError: (error) => {
      console.error(`Failed to create item in ${collection}:`, error);
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
}

export function getCMSData<T extends CMSItem = CMSItem>(
  collection: string
): T[] {
  return (staticCMSData[collection] || []) as T[];
}

export function getCMSItem<T extends CMSItem = CMSItem>(
  collection: string,
  slug: string
): T | null {
  const data = staticCMSData[collection] || [];
  return (data.find((item) => item.slug === slug) || null) as T | null;
}
