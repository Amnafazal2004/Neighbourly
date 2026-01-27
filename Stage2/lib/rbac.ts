// lib/rbac.ts
import { Role } from "@/generated/prisma/client";
import { permissions } from "./permissions";

export function hasPermission(
  role: Role,
  permission: keyof typeof permissions
):boolean {
  return permissions[permission].includes(role);
}
