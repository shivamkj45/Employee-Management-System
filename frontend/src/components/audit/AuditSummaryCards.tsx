import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useAuditStats } from "../../hooks/useAudit";

export default function AuditSummaryCards() {

  const {
    data: stats,
    isLoading,
  } = useAuditStats();

  if (isLoading || !stats) return null;

  const cards = [

    {
      title: "Total Logs",
      value: stats.totalLogs,
      icon: <HistoryIcon fontSize="large" />,
    },

    {
      title: "Today's Logs",
      value: stats.todayLogs,
      icon: <TodayIcon fontSize="large" />,
    },

    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: <PeopleIcon fontSize="large" />,
    },

    {
      title: "Critical Actions",
      value: stats.criticalLogs,
      icon: <WarningAmberIcon fontSize="large" />,
    },

  ];

  return (

    <Grid container spacing={3} mb={3}>

      {cards.map((card) => (

        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={card.title}
        >

          <Card
            sx={{
              borderRadius: 3,
            }}
          >

            <CardContent>

              {card.icon}

              <Typography
                variant="h5"
                fontWeight={700}
                mt={1}
              >
                {card.value}
              </Typography>

              <Typography color="text.secondary">
                {card.title}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}