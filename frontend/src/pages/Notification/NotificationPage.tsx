import Typography from "@mui/material/Typography";
import DashboardLayout from "../../layouts/DashboardLayout";

import NotificationSummaryCards from "../../components/notification/NotificationSummaryCards";
import NotificationToolbar from "../../components/notification/NotificationToolbar";
import NotificationTable from "../../components/notification/NotificationTable";

import { useNotifications } from "../../hooks/useNotification";

import { useState } from "react";

function NotificationPage() {

  const {
    data,
    isLoading,
  } = useNotifications( 1,
  20,
  true);

  const notifications =
    data?.notifications ?? [];

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [category, setCategory] =
    useState("");

  const filteredNotifications =
    notifications.filter((notification: any) => {

      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        notification.message
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === ""
          ? true
          : status === "Read"
          ? notification.isRead
          : !notification.isRead;

      const matchesCategory =
        category === ""
          ? true
          : notification.category ===
            category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );

    });

  if (isLoading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Notification Center
      </Typography>

      <NotificationSummaryCards
        notifications={
          notifications
        }
      />

      <Typography
        variant="h5"
        sx={{
          mt: 5,
          mb: 2,
          fontWeight: 700,
        }}
      >
        Notifications
      </Typography>

      <NotificationToolbar

        search={search}
        setSearch={setSearch}

        status={status}
        setStatus={setStatus}

        category={category}
        setCategory={setCategory}

      />

      <NotificationTable
        notifications={
          filteredNotifications
        }
      />

    </DashboardLayout>
  );
}

export default NotificationPage;