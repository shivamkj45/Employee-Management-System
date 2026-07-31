import {
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

import AttendanceDetailsDrawer from "./AttendanceDetailsDrawer";

import { useMemo, useState } from "react";

interface Props {
  attendance: any[];
}

function AttendanceTable({ attendance }: Props) {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [orderBy, setOrderBy] =
    useState("employee");

  const [order, setOrder] = useState<
    "asc" | "desc"
  >("asc");

  const [selectedAttendance, setSelectedAttendance] =
    useState<any>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const handleChangePage = (
    _: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );

    setPage(0);
  };

  const handleSort = (property: string) => {
    const isAsc =
      orderBy === property &&
      order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);
  };

  const sortedAttendance = useMemo(() => {
    return [...attendance].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (orderBy) {
        case "employee":
          valueA = `${a.employee.firstName} ${a.employee.lastName}`;
          valueB = `${b.employee.firstName} ${b.employee.lastName}`;
          break;

        case "department":
          valueA =
            a.employee.department?.name ?? "";
          valueB =
            b.employee.department?.name ?? "";
          break;

        case "status":
          valueA = a.status;
          valueB = b.status;
          break;

        case "checkIn":
          valueA = a.checkIn
            ? new Date(a.checkIn).getTime()
            : 0;

          valueB = b.checkIn
            ? new Date(b.checkIn).getTime()
            : 0;
          break;

        default:
          valueA = "";
          valueB = "";
      }

      if (valueA < valueB)
        return order === "asc" ? -1 : 1;

      if (valueA > valueB)
        return order === "asc" ? 1 : -1;

      return 0;
    });
  }, [attendance, order, orderBy]);

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={3}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={
                    orderBy === "employee"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort("employee")
                  }
                >
                  Employee
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={
                    orderBy ===
                    "department"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort(
                      "department"
                    )
                  }
                >
                  Department
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={
                    orderBy ===
                    "checkIn"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort(
                      "checkIn"
                    )
                  }
                >
                  Check In
                </TableSortLabel>
              </TableCell>

              <TableCell>
                Check Out
              </TableCell>

              <TableCell>
                Working Hours
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={
                    orderBy ===
                    "status"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort("status")
                  }
                >
                  Status
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedAttendance
              .slice(
                page * rowsPerPage,
                page * rowsPerPage +
                  rowsPerPage
              )
              .map((record) => (
                <TableRow
                  key={record._id}
                  hover
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedAttendance(
                      record
                    );

                    setDrawerOpen(true);
                  }}
                >
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 12,
                      }}
                    >
                      <Avatar
                        src={
                          record.employee
                            .profileImage
                        }
                      />

                      <Typography>
                        {
                          record.employee
                            .firstName
                        }{" "}
                        {
                          record.employee
                            .lastName
                        }
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell>
                    {
                      record.employee
                        .department?.name
                    }
                  </TableCell>

                  <TableCell>
                    {record.checkIn
                      ? new Date(
                          record.checkIn
                        ).toLocaleTimeString(
                          [],
                          {
                            hour:
                              "2-digit",
                            minute:
                              "2-digit",
                          }
                        )
                      : "--"}
                  </TableCell>

                  <TableCell>
                    {record.checkOut
                      ? new Date(
                          record.checkOut
                        ).toLocaleTimeString(
                          [],
                          {
                            hour:
                              "2-digit",
                            minute:
                              "2-digit",
                          }
                        )
                      : "--"}
                  </TableCell>

                  <TableCell>
                    {record.workingHours ??
                      "--"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        record.status
                      }
                      color={
                        record.status ===
                        "Present"
                          ? "success"
                          : record.status ===
                            "Absent"
                          ? "error"
                          : record.status ===
                            "Leave"
                          ? "warning"
                          : "info"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={attendance.length}
          page={page}
          onPageChange={
            handleChangePage
          }
          rowsPerPage={
            rowsPerPage
          }
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
          rowsPerPageOptions={[
            5,
            10,
            25,
            50,
          ]}
        />
      </TableContainer>

      <AttendanceDetailsDrawer
        open={drawerOpen}
        attendance={
          selectedAttendance
        }
        onClose={() =>
          setDrawerOpen(false)
        }
      />
    </>
  );
}

export default AttendanceTable;