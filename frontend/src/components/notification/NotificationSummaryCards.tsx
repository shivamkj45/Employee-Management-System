import { Grid, Paper, Typography } from "@mui/material";

interface Props {
  notifications: any[];
}

function NotificationSummaryCards({
  notifications,
}: Props) {
  const total = notifications.length;

  const unread = notifications.filter(
    (n) => !n.isRead
  ).length;

  const read = total - unread;

  const highPriority = notifications.filter(
    (n) =>
      n.priority === "high" ||
      n.priority === "critical"
  ).length;

  const cards = [
    {
      title: "Total",
      value: total,
    },
    {
      title: "Unread",
      value: unread,
    },
    {
      title: "Read",
      value: read,
    },
    {
      title: "High Priority",
      value: highPriority,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          key={card.title}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
            }}
          >
            <Typography
              color="text.secondary"
            >
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default NotificationSummaryCards;