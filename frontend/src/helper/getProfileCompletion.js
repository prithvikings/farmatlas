import { profileRequirements } from "./profileRequirements";

export const getProfileCompletion = (user, form) => {
  if (!user) return 0;

  const base = profileRequirements.BASE;
  const roleFields = profileRequirements[user.role] || [];
  const fields = [...base, ...roleFields];

  let completed = 0;

  for (const path of fields) {
    const [parent, child] = path.split(".");

    let value;

    if (child) {
      value = form?.[child] ?? user.profile?.[child];
    } else {
      value = form?.[parent] ?? user[parent];
    }

    // IMPORTANT: allow numeric 0
    if (value !== undefined && value !== null && value !== "") {
      completed++;
    }
  }

  return Math.round((completed / fields.length) * 100);
};
