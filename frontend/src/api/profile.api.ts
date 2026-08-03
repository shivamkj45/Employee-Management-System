import api from "./axios";

import type {
  ProfileResponse,
  ProfileStats,
  ProfileCompletion,
  Activity,
} from "../types/profile.types";

/* ===============================
   GET PROFILE
================================ */

export const getMyProfile = async () => {

  const { data } =
    await api.get("/profile");

  return data.data as ProfileResponse;

};

/* ===============================
   UPDATE PROFILE
================================ */

export const updateMyProfile = async (
  payload: any
) => {

  const { data } =
    await api.put(
      "/profile",
      payload
    );

  return data.data;

};

/* ===============================
   PROFILE STATS
================================ */

export const getProfileStats = async () => {

  const { data } =
    await api.get(
      "/profile/stats"
    );

  return data.data as ProfileStats;

};

/* ===============================
   PROFILE ACTIVITY
================================ */

export const getProfileActivity = async () => {

  const { data } =
    await api.get(
      "/profile/activity"
    );

  return data.data as Activity[];

};

/* ===============================
   PROFILE COMPLETION
================================ */

export const getProfileCompletion = async () => {

  const { data } =
    await api.get(
      "/profile/completion"
    );

  return data.data as ProfileCompletion;

};