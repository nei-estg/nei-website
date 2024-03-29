import client from "./Client";
import AuthenticatedClient from "./AuthenticatedClient";
import { IMaterial } from "@src/interfaces/IMaterial";
import { IMaterialTag } from "@src/interfaces/IMaterialTag";

export const getMaterialsList = async () => {
  const response = await client.get("/api/material/");
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IMaterial[];
}

export const createMaterial = async (material: IMaterial) => {
  const response = await AuthenticatedClient.post("/api/material/", material);
  if (response.status !== 201) throw new Error(response.data);
  return response.data as IMaterial;
}

export const getMaterialTagList = async () => {
  const response = await client.get("/api/materialTag/");
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IMaterialTag[];
}
