import axios from "axios";
import store from "@/store";
import apiClient from "./apiClient";

const API_URL = "https://iapitest.eva.guru/";

interface LoginCredentials {
  Email: string;
  Password: string;
  GrantType: string;
  Scope: string;
  ClientId: string;
  ClientSecret: string;
  RedirectUri: string;
}

interface TokenResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: {
    AccessToken: string;
    RefreshToken: string;
    TokenType: string;
    ExpiresAt: string;
  };
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<void> {
  try {
    const response = await axios.post(`${API_URL}/oauth/token`, {
      email,
      password,
      // Add other required fields
    });

    const token = response.data.accessToken; // Adjust based on actual response structure
    store.dispatch("auth/updateAccessToken", token);
    localStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

const login = async (email: string, password: string): Promise<string> => {
  const credentials: LoginCredentials = {
    Email: email,
    Password: password,
    GrantType: "password", // This field is usually static for this grant type
    Scope: "amazon_data", // Adjust if necessary
    ClientId: "C0001", // Use the provided client ID
    ClientSecret: "SECRET0001", // Use the provided client secret
    RedirectUri: "https://api.eva.guru", // Use the provided redirect URI
  };
  console.log(credentials, "credentials");
  try {
    const response = await apiClient.post<TokenResponse>(
      "/oauth/token",
      credentials
    );
    console.log(response, "response");
    const { AccessToken } = response.data.Data;
    if (AccessToken) {
      localStorage.setItem("accessToken", AccessToken);
      return AccessToken;
    } else {
      console.error("AccessToken is not available in the response");
      return "";
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem("accessToken");
};
export { login, logout };
