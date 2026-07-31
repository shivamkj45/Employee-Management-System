import {
  Card,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useLeaveStats } from "../../hooks/useDashboard";

function LeaveChart() {
  const { data, isLoading } =
    useLeaveStats();

 if (isLoading) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Skeleton
          width={220}
          height={35}
        />

        <Skeleton
          variant="rounded"
          height={300}
        />
      </CardContent>
    </Card>
  );
}

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Leave Statistics
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={data}>
            <XAxis dataKey="status" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#1976d2"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default LeaveChart;