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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import {
  useApproveLeave,
  useRejectLeave,
} from "../../hooks/useLeave";

import LeaveDetailsDrawer from "./LeaveDetailsDrawer";

import { useMemo, useState } from "react";

interface Props {
  leaves: any[];
}

function LeaveTable({ leaves }: Props) {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [orderBy, setOrderBy] =
    useState("employee");

  const [order, setOrder] = useState<
    "asc" | "desc"
  >("asc");

  const approveMutation =
    useApproveLeave();

  const rejectMutation =
    useRejectLeave();

  const [selectedLeave, setSelectedLeave] =
    useState<any>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const handleSort = (property: string) => {
    const isAsc =
      orderBy === property &&
      order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);
  };

  const sortedLeaves = useMemo(() => {
    return [...leaves].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (orderBy) {
        case "employee":
          valueA =
            `${a.employee.firstName} ${a.employee.lastName}`;
          valueB =
            `${b.employee.firstName} ${b.employee.lastName}`;
          break;

        case "department":
          valueA =
            a.employee.department?.name ??
            "";
          valueB =
            b.employee.department?.name ??
            "";
          break;

        case "leaveType":
          valueA = a.leaveType;
          valueB = b.leaveType;
          break;

        case "status":
          valueA = a.status;
          valueB = b.status;
          break;

        default:
          valueA = "";
          valueB = "";
      }

      if (valueA < valueB)
        return order === "asc"
          ? -1
          : 1;

      if (valueA > valueB)
        return order === "asc"
          ? 1
          : -1;

      return 0;
    });
  }, [leaves, order, orderBy]);

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
                    orderBy ===
                    "employee"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort(
                      "employee"
                    )
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
                    "leaveType"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort(
                      "leaveType"
                    )
                  }
                >
                  Leave Type
                </TableSortLabel>
              </TableCell>

              <TableCell>
                From
              </TableCell>

              <TableCell>
                To
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={
                    orderBy ===
                    "status"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort(
                      "status"
                    )
                  }
                >
                  Status
                </TableSortLabel>
              </TableCell>

              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedLeaves
              .slice(
                page *
                  rowsPerPage,
                page *
                  rowsPerPage +
                  rowsPerPage
              )
              .map((leave) => (
                <TableRow
                  key={leave._id}
                  hover
                  sx={{
                    cursor:
                      "pointer",
                  }}
                  onClick={() => {
                    setSelectedLeave(
                      leave
                    );

                    setDrawerOpen(
                      true
                    );
                  }}
                >
                  <TableCell>
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 12,
                      }}
                    >
                      <Avatar
                        src={
                          leave.employee
                            .profileImage
                        }
                      />

                      <Typography>
                        {
                          leave
                            .employee
                            .firstName
                        }{" "}
                        {
                          leave
                            .employee
                            .lastName
                        }
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell>
                    {
                      leave
                        .employee
                        .department
                        ?.name
                    }
                  </TableCell>

                  <TableCell>
                    {
                      leave.leaveType
                    }
                  </TableCell>

                  <TableCell>
                    {new Date(
                      leave.startDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      leave.endDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        leave.status
                      }
                      color={
                        leave.status ===
                        "Approved"
                          ? "success"
                          : leave.status ===
                            "Rejected"
                          ? "error"
                          : "warning"
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    {leave.status ===
                      "Pending" && (
                      <>
                        <Tooltip title="Approve">
                          <IconButton
                            color="success"
                            onClick={(
                              e
                            ) => {
                              e.stopPropagation();

                              approveMutation.mutate(
                                leave._id
                              );
                            }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Reject">
                          <IconButton
                            color="error"
                            onClick={(
                              e
                            ) => {
                              e.stopPropagation();

                              rejectMutation.mutate(
                                leave._id
                              );
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={leaves.length}
          page={page}
          rowsPerPage={
            rowsPerPage
          }
          onPageChange={(
            _,
            page
          ) =>
            setPage(page)
          }
          onRowsPerPageChange={(
            e
          ) => {
            setRowsPerPage(
              parseInt(
                e.target.value
              )
            );

            setPage(0);
          }}
          rowsPerPageOptions={[
            5,
            10,
            25,
            50,
          ]}
        />
      </TableContainer>

      <LeaveDetailsDrawer
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
        leave={selectedLeave}
      />
    </>
  );
}

export default LeaveTable;