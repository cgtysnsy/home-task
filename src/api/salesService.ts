// src/api/salesService.ts

import apiClient from "./apiClient"; // Assuming you have an Axios instance set up
import type {
  DailySalesOverviewItem,
  DailySalesOverviewResponse,
  DailySalesOverviewParams,
} from "@/types";

// Use the interfaces defined above...

export const fetchDailySalesOverview = async (
  params: DailySalesOverviewParams
): Promise<DailySalesOverviewResponse> => {
  const response = await apiClient.post<DailySalesOverviewResponse>(
    "/data/daily-sales-overview",
    params
  );

  return response.data;
};

export const fetchSalesSkuList = async (params: any): Promise<any> => {
  try {
    const response = await apiClient.post(
      "/data/daily-sales-sku-list/",
      params
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching daily sales SKU list:", error);
    throw error; // Or handle it as needed
  }
};
