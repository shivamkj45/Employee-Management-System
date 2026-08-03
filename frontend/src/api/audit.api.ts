import api from "./axios";

import type {
  AuditLog,
  AuditResponse,
} from "../types/audit.types";

export const getAuditLogs = async () => {
  const { data } =
    await api.get<AuditResponse>(
      "/audit"
    );

  return data.data;
};

export const getMyAuditLogs = async () => {
  const { data } =
    await api.get<AuditResponse>(
      "/audit/me"
    );

  return data.data;
};
export const getAuditStats = async () => {

  const { data } =
    await api.get("/audit/stats");

  return data.data;

};