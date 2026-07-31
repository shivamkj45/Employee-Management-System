import {
  Card,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

import {
  LineChart,
  ResponsiveContainer,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { useAttendanceTrend } from "../../hooks/useDashboard";

function AttendanceChart() {
  const { data,isLoading } =
    useAttendanceTrend();

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
          Attendance Trend
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              dataKey="present"
              stroke="#1976d2"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default AttendanceChart;