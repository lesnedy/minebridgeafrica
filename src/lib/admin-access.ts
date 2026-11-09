export const ADMIN_OVERRIDE_EMAIL = "clintonmsety@gmail.com";

export function isAdminOverrideEmail(email?: string | null) {
  return !!email && email.trim().toLowerCase() === ADMIN_OVERRIDE_EMAIL.toLowerCase();
}
