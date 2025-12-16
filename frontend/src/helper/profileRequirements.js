export const profileRequirements = {
  BASE: ["name"],

  WORKER: [
    "profile.phone",
    "profile.assignedSection",
    "profile.experienceYears",
  ],

  VET: ["profile.phone", "profile.specialization", "profile.experienceYears"],

  ADMIN: [
    "profile.phone",
    "profile.address",
    "profile.city",
    "profile.country",
  ],
};
