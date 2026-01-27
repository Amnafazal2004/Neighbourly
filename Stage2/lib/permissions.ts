// lib/permissions.ts
import { Role } from "@/generated/prisma/client";

export const permissions: Record<string, Role[]> = {
  "service:create": [Role.provider],
  "service:delete": [Role.admin],
  "service:view": [Role.admin, Role.provider, Role.seeker],
};

export type Permission = keyof typeof permissions;