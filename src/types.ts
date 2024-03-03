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

// Define the types for the nested objects first
export interface DailySalesOverviewItem {
  fbmAmount: any;
  fbaAmount: any;
  date: string;
  amount: number;
  orderCount: number;
  unitCount: number;
  avgSalesPrev30Days: number;
  prevYearDate: string;
  prevYearAmount: number;
  prevYearOrderCount: number;
  prevYearUnitCount: number;
  prevYearAvgSalesPrev30Days: number;
  profit: number;
  yoy30DailySalesGrowth: number;
  acos: number;
}

export interface DailySalesOverviewParams {
  marketplace: string;
  sellerId: string;
  requestStatus: number;
  day: number;
  excludeYoYData: boolean;
}
export interface DailySalesOverviewData {
  Currency: string;
  item: DailySalesOverviewItem[];
  isYoyExist: boolean;
}
// Now define the DailySalesOverviewResponse using the item type
export interface DailySalesOverviewResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: DailySalesOverviewData;
}
