import { UserRole } from "../../types/roles";

import User from "../user/user.model";

import { createNotification } from "./notification.service";

import { sendEmail } from "../../services/email.service";

interface NotifyOptions {
  title: string;
  message: string;

  type?:
    | "info"
    | "success"
    | "warning"
    | "error";

  category?:
    | "system"
    | "leave"
    | "attendance"
    | "employee"
    | "payroll";

  priority?:
    | "low"
    | "medium"
    | "high"
    | "critical";

  emailSubject?: string;

  emailHtml?: string;

  actionUrl?: string;

  metadata?: Record<string, any>;
}

export async function notifyUsers(
  userIds: string[],
  options: NotifyOptions
) {

  const users = await User.find({
    _id: { $in: userIds },
    isActive: true,
  });

  await Promise.all(

    users.map(async (user) => {

      await createNotification(
        user._id.toString(),
        options.title,
        options.message,
        options.type,
        options.category,
        options.priority,
        options.actionUrl,
        options.metadata
      );

      if (
        options.emailSubject &&
        options.emailHtml
      ) {

        try {

          await sendEmail({
            to: user.email,
            subject:
              options.emailSubject,
            html:
              options.emailHtml,
          });

        } catch (error) {

          console.error(
            "Email failed:",
            user.email
          );

        }

      }

    })

  );

}

export async function notifyRolesEnterprise(
  roles: UserRole[],
  options: NotifyOptions
) {

  const users = await User.find({

    role: {
      $in: roles,
    },

    isActive: true,

  }).select("_id");

  return notifyUsers(
    users.map((u) => u._id.toString()),
    options
  );

}

export async function notifyUserEnterprise(
  userId: string,
  options: NotifyOptions
) {

  return notifyUsers(
    [userId],
    options
  );

}