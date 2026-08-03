import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HistoryIcon from "@mui/icons-material/History";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BadgeIcon from "@mui/icons-material/Badge";

import { useProfileStats } from "../../hooks/useProfile";

export default function ProfileStats() {

  const { data, isLoading } =
    useProfileStats();

  if (isLoading || !data) return null;

  const cards = [

    {
      title: "Years in Company",
      value: data.yearsInCompany,
      icon: <WorkHistoryIcon fontSize="large" />,
    },

    {
      title: "Notifications",
      value: data.totalNotifications,
      icon: <NotificationsActiveIcon fontSize="large" />,
    },

    {
      title: "Activities",
      value: data.totalActivities,
      icon: <HistoryIcon fontSize="large" />,
    },

    {
      title: "Department",
      value: data.department,
      icon: <ApartmentIcon fontSize="large" />,
    },

    {
      title: "Designation",
      value: data.designation,
      icon: <BadgeIcon fontSize="large" />,
    },

  ];

  return (

    <Grid
      container
      spacing={3}
    >

      {cards.map((card) => (

        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >

          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
            }}
          >

            <CardContent>

              {card.icon}

              <Typography
                variant="h5"
                fontWeight={700}
                mt={2}
              >
                {card.value}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {card.title}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}