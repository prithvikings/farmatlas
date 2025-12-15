// utils/profileCompletion.js
import { profileRequirements } from "../helper/profileCompletion.js";

export const getProfileCompletion = (user) => {
  const base = profileRequirements.BASE;
  const roleFields = profileRequirements[user.role] || [];

  const fields = [...base, ...roleFields];

  let completed = 0;

  for (const path of fields) {
    const [parent, child] = path.split(".");
    const value = child ? user[parent]?.[child] : user[parent];
    if (value !== undefined && value !== null && value !== "") {
      completed++;
    }
  }

  return Math.round((completed / fields.length) * 100);
};
