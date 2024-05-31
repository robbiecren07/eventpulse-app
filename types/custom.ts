import { Database } from "./supabase";

export type ApiKeys = Database["public"]["Tables"]["sources"]["Row"]

export interface Credentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export interface Destination {
  name: string;
  projectId: string;
  location: string;
  datasetId: string;
  tableId: string;
  credentials: Credentials;
}