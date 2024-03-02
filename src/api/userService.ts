import apiClient from "./apiClient";

interface UserInformationResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: {
    token: "string";
    user: {
      firstName: "string";
      lastName: "string";
      email: "string";
      countryCode: "string";
      callingCode: "string";
      telephoneNumber: "string";
      isAdmin: "string";
      store: [
        {
          storeName: "string";
          storeId: "string";
          evaStoreId: "string";
          storeType: 0;
          region: "string";
          paidStatus: 0;
          pricingStatus: 0;
          paidDate: "2024-03-02T00:30:15.600Z";
          reimbursementPackageTrialEndDate: "2024-03-02T00:30:15.600Z";
          linkedDate: "2024-03-02T00:30:15.600Z";
          marketplaceName: "string";
          marketplaceCode: "string";
          enableRepricing: true;
        }
      ];
    };
    remainingReimbursementCredit: 0;
    monthlyReimbursementPackageCredit: 0;
    packageInformation: {
      turnoverPackageInformation: {
        pricingStatus: 0;
        packageName: "string";
        monthlyFee: 0;
        lowerLimit: 0;
        upperLimit: 0;
        reimbursementCredit: 0;
      };
      skuPackageInformation: {
        packageName: "string";
        skuChargeFee: 0;
      };
    };
    isLinkAccount: true;
    linkAccountParameters: {
      developerName: "string";
      accountNumber: "string";
    };
  };
}

export const fetchUserInformation =
  async (): Promise<UserInformationResponse> => {
    const response = await apiClient.post<UserInformationResponse>(
      "/user/user-information",
      {
        email: "homework@eva.guru",
      }
    );
    return response.data;
  };
