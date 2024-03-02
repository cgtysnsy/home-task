// src/api/salesService.ts

import apiClient from "./apiClient"; // Assuming you have an Axios instance set up

export const fetchDailySalesOverview = async (params: any): Promise<any> => {
  try {
    const response = await apiClient.post(
      "/data/daily-sales-overview/",
      params
    );
    console.log(response, "salesservice response");
    return response.data;
  } catch (error) {
    console.error("Error fetching daily sales overview:", error);
    throw error; // Or handle it as needed
  }
};

export const fetchDailySalesSkuList = async (params: any): Promise<any> => {
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

// Add more functions as needed for different sales-related endpoints
