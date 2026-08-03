import { useQuery } from "@tanstack/react-query";

import {
  getAuditLogs,
  getMyAuditLogs,
  getAuditStats,
} from "../api/audit.api";

/* ===========================
   ALL AUDIT LOGS
=========================== */

export function useAuditLogs() {
  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: getAuditLogs,
  });
}

/* ===========================
   MY AUDIT LOGS
=========================== */

export function useMyAuditLogs() {
  return useQuery({
    queryKey: ["my-audit-logs"],
    queryFn: getMyAuditLogs,
  });
}

/* ===========================
   AUDIT STATS
=========================== */

export function useAuditStats() {
  return useQuery({
    queryKey: ["audit-stats"],
    queryFn: getAuditStats,
  });
}