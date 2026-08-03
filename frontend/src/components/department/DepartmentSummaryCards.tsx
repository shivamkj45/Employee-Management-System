import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GroupsIcon from "@mui/icons-material/Groups";

import { useDepartmentStats } from "../../hooks/useDepartments";

export default function DepartmentSummaryCards() {

  const {
    data: stats,
    isLoading,
  } = useDepartmentStats();

  if (isLoading || !stats) return null;

  const cards = [

    {
      title: "Departments",
      value: stats.totalDepartments,
      icon: <ApartmentIcon fontSize="large" />,
    },

    {
      title: "Active",
      value: stats.activeDepartments,
      icon: <CheckCircleIcon fontSize="large" />,
    },

    {
      title: "Inactive",
      value: stats.inactiveDepartments,
      icon: <CancelIcon fontSize="large" />,
    },

    {
      title: "Employees",
      value: stats.totalEmployees,
      icon: <GroupsIcon fontSize="large" />,
    },

  ];

  return (

    <Grid container spacing={3}>

      {cards.map((card) => (

        <Grid
          size={{xs:12,sm:6,md:3}}
          key={card.title}
        >

          <Card
            sx={{
              borderRadius:3,
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