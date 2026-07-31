import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#1976d220",
              p: 1.5,
              borderRadius: 2,
              color: "primary.main",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;