import { useMemo, useState } from "react";

import Typography from "@mui/material/Typography";

import DashboardLayout from "../../layouts/DashboardLayout";

import AuditSummaryCards from "../../components/audit/AuditSummaryCards";
import AuditToolbar from "../../components/audit/AuditToolbar";
import AuditTable from "../../components/audit/AuditTable";
import AuditDetailsDrawer from "../../components/audit/AuditDetailsDrawer";

import { useAuditLogs } from "../../hooks/useAudit";

export default function AuditLogsPage() {

  const {

    data: logs = [],

    isLoading,

  } = useAuditLogs();

  const [search, setSearch] =
    useState("");

  const [action, setAction] =
    useState("");

  const [module, setModule] =
    useState("");

  const [selectedLog,
    setSelectedLog] =
    useState<any>(null);

  const [drawerOpen,
    setDrawerOpen] =
    useState(false);

  const filteredLogs =
    useMemo(() => {

      return logs.filter((log: any) => {

        const searchMatch =

          log.description
            ?.toLowerCase()
            .includes(search.toLowerCase())

          ||

          log.user?.employee?.firstName
            ?.toLowerCase()
            .includes(search.toLowerCase())

          ||

          log.user?.employee?.lastName
            ?.toLowerCase()
            .includes(search.toLowerCase())

          ||

          log.user?.email
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const actionMatch =
          !action ||
          log.action === action;

        const moduleMatch =
          !module ||
          log.module === module;

        return (

          searchMatch &&

          actionMatch &&

          moduleMatch

        );

      });

    }, [

      logs,

      search,

      action,

      module,

    ]);

  if (isLoading) {

    return (

      <DashboardLayout>

        Loading...

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >

        Audit Logs

      </Typography>

      <AuditSummaryCards />

      <AuditToolbar

        search={search}

        setSearch={setSearch}

        action={action}

        setAction={setAction}

        module={module}

        setModule={setModule}

        onExportPDF={() => {}}

        onExportExcel={() => {}}

      />

      <AuditTable

        logs={filteredLogs}

        onView={(log) => {

          setSelectedLog(log);

          setDrawerOpen(true);

        }}

      />

      <AuditDetailsDrawer

        open={drawerOpen}

        onClose={() =>
          setDrawerOpen(false)
        }

        log={selectedLog}

      />

    </DashboardLayout>

  );

}