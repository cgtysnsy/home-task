// src/api/salesService.ts

import apiClient from "./apiClient"; // Assuming you have an Axios instance set up
import type {
  DailySalesOverviewItem,
  DailySalesOverviewResponse,
  DailySalesOverviewParams,
  SkuRefundRateParams,
  SkuRefundRateResponse,
} from "@/types";

export const fetchDailySalesOverview = async (
  params: DailySalesOverviewParams
): Promise<DailySalesOverviewResponse> => {
  try {
    const response = await apiClient.post<DailySalesOverviewResponse>(
      "/data/daily-sales-overview",
      params
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching daily sales overview:", error);
    throw error;
  }
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
    throw error;
  }
};

export const fetchSkuRefund = async (
  params: SkuRefundRateParams
): Promise<SkuRefundRateResponse[]> => {
  try {
    const response = await apiClient.post("/data/get-sku-refund-rate/", params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
