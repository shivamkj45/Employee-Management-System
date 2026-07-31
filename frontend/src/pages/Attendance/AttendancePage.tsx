import Typography from "@mui/material/Typography";
import {
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

import dayjs, {
  Dayjs,
} from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DashboardLayout from "../../layouts/DashboardLayout";

import AttendanceSummaryCard from "../../components/attendance/AttendanceSummaryCard";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceToolbar from "../../components/attendance/AttendanceToolbar";

import { useDepartments } from "../../hooks/useDepartments";
import { useTodayAttendance } from "../../hooks/useAttendance";

import {
  exportAttendanceToExcel,
  exportAttendanceToPDF,
} from "../../utils/attendanceExport";

function AttendancePage() {
  const [selectedDate, setSelectedDate] =
    useState<Dayjs | null>(dayjs());

  const [queryDate, setQueryDate] =
    useState(dayjs().format("YYYY-MM-DD"));

  const {
    data,
    isLoading,
  } = useTodayAttendance(queryDate);

  const {
    data: departmentsData = [],
  } = useDepartments();

  const [search, setSearch] = useState("");

  const [department, setDepartment] =
    useState("");

  const [status, setStatus] =
    useState("");

  const attendance = data ?? [];

  const departments = departmentsData.map(
    (department: any) => department.name
  );

  const filteredAttendance =
    attendance.filter((item: any) => {
      const fullName =
        `${item.employee.firstName} ${item.employee.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(
          search.toLowerCase()
        );

      const matchesDepartment =
        department === "" ||
        item.employee.department.name ===
          department;

      const matchesStatus =
        status === "" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });

  if (isLoading) {
    return (
      <DashboardLayout>
        <Typography>
          Loading...
        </Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Attendance
        </Typography>

        <Box
          display="flex"
          gap={2}
          alignItems="center"
        >
          <DatePicker
            label="Attendance Date"
            value={selectedDate}
            onChange={(value) =>
              setSelectedDate(value)
            }
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  width: 220,
                },
              },
            }}
          />

          <Button
            variant="contained"
            onClick={() => {
              if (selectedDate) {
                setQueryDate(
                  selectedDate.format(
                    "YYYY-MM-DD"
                  )
                );
              }
            }}
          >
            View Attendance
          </Button>
        </Box>
      </Box>

      <AttendanceSummaryCard
        attendance={attendance[0]}
      />

      <Typography
        variant="h5"
        sx={{
          mt: 5,
          mb: 2,
          fontWeight: 700,
        }}
      >
        Attendance Records
      </Typography>

      <AttendanceToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
        departments={departments}
        onExportExcel={() =>
          exportAttendanceToExcel(
            filteredAttendance
          )
        }
        onExportPDF={() =>
          exportAttendanceToPDF(
            filteredAttendance
          )
        }
      />

      <AttendanceTable
        attendance={filteredAttendance}
      />
    </DashboardLayout>
  );
}

export default AttendancePage;