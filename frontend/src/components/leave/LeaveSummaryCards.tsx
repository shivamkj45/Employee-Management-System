import Grid from "@mui/material/Grid";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import StatCard from "../dashboard/StatCard";

import { useLeaveSummary } from "../../hooks/useLeave";

function LeaveSummaryCards() {
  const { data, isLoading } =
    useLeaveSummary();

  if (isLoading) return null;

  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Pending Requests"
          value={data.pending}
          icon={
            <PendingActionsIcon
              color="warning"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Approved"
          value={data.approved}
          icon={
            <CheckCircleIcon
              color="success"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Rejected"
          value={data.rejected}
          icon={
            <CancelIcon
              color="error"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="On Leave Today"
          value={data.onLeaveToday}
          icon={
            <BeachAccessIcon
              color="primary"
              fontSize="large"
            />
          }
        />
      </Grid>
    </Grid>
  );
}

export default LeaveSummaryCards;