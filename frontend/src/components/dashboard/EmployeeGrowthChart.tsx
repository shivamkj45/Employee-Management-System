import {
  Card,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useEmployeeGrowth } from "../../hooks/useDashboard";

function EmployeeGrowthChart() {
  const { data, isLoading } = useEmployeeGrowth();

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
          Employee Growth
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="employees"
              stroke="#1976d2"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default EmployeeGrowthChart;