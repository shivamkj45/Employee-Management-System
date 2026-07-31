import {
  Card,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDepartmentStats } from "../../hooks/useDashboard";

function DepartmentChart() {
  const { data, isLoading } =
    useDepartmentStats();

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
          Department Distribution
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="employees"
              nameKey="department"
              outerRadius={110}
              label
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default DepartmentChart;