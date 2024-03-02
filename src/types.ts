interface StoreInfo {
  storeName: string;
  storeId: string;
  evaStoreId: string;
  storeType: number;
  region: string;
  paidStatus: number;
  pricingStatus: number;
  paidDate: string;
  reimbursementPackageTrialEndDate: string;
  linkedDate: string;
  marketplaceName: string;
  marketplaceCode: string;
  enableRepricing: boolean;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  callingCode: string;
  telephoneNumber: string;
  isAdmin: string; // Changed from boolean to string
  store: StoreInfo[];
}

interface PackageInformation {
  turnoverPackageInformation: {
    pricingStatus: number;
    packageName: string;
    monthlyFee: number;
    lowerLimit: number;
    upperLimit: number;
    reimbursementCredit: number;
  };
  skuPackageInformation: {
    packageName: string;
    skuChargeFee: number;
  };
}

interface LinkAccountParameters {
  developerName: string;
  accountNumber: string;
}

export interface UserInformationResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: {
    token: string;
    user: User;
    remainingReimbursementCredit: number;
    monthlyReimbursementPackageCredit: number;
    packageInformation: PackageInformation;
    isLinkAccount: boolean;
    linkAccountParameters: LinkAccountParameters;
  };
}
