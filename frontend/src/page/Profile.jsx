import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    experienceYears: "",
    specialization: "",
    assignedSection: "",
    emergencyContact: "",
    bio: "",
  });

  useEffect(() => {
    api.get("/profile/me")
      .then(res => {
        const u = res.data;
        setEmail(u.email);
        setForm({
          name: u.name || "",
          phone: u.profile?.phone || "",
          address: u.profile?.address || "",
          city: u.profile?.city || "",
          state: u.profile?.state || "",
          country: u.profile?.country || "",
          experienceYears: u.profile?.experienceYears || "",
          specialization: u.profile?.specialization || "",
          assignedSection: u.profile?.assignedSection || "",
          emergencyContact: u.profile?.emergencyContact || "",
          bio: u.profile?.bio || "",
        });
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await api.put("/profile/me", {
        name: form.name,
        profile: {
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          experienceYears: form.experienceYears,
          specialization: form.specialization,
          assignedSection: form.assignedSection,
          emergencyContact: form.emergencyContact,
          bio: form.bio,
        },
      });

      setUser(res.data.user); // sync auth state
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
  return <ProfileSkeleton />;
}


  return (

    
    <div className="max-w-2xl space-y-6">
      
      <h1 className="text-3xl font-poppins font-medium leading-tight">My Profile</h1>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}
      <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 mb-6">
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm font-medium font-poppins">
      Profile Completion
    </span>
    <span className="text-sm font-poppins">
      {user.profileCompletion}%
    </span>
  </div>

  <div className="w-full h-2 rounded bg-zinc-200 overflow-hidden">
    <div
      className="h-full bg-indigo-600"
      style={{ width: `${user.profileCompletion}%` }}
    />
  </div>

  {user.profileCompletion < 80 && (
    <p className="text-xs text-zinc-500 mt-2 font-poppins">
      Complete your profile to unlock all features.
    </p>
  )}
</div>


      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <ReadOnly label="Email" value={email} />
        <ReadOnly label="Role" value={role} />
      </Section>

      {/* CONTACT */}
      <Section title="Contact Details">
        <Input 
        name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <Input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Emergency Contact" />
        <Input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <div className="grid grid-cols-2 gap-3">
          <Input name="city" value={form.city} onChange={handleChange} placeholder="City" />
          <Input name="state" value={form.state} onChange={handleChange} placeholder="State" />
        </div>
        <Input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
      </Section>

      {/* ROLE-SPECIFIC */}
      {user.role === "VET" && (
        <Section title="Veterinary Info">
          <Input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
          />
          <Input
            name="experienceYears"
            type="number"
            value={form.experienceYears}
            onChange={handleChange}
            placeholder="Years of Experience"
          />
        </Section>
      )}

      {user.role === "WORKER" && (
        <Section title="Work Info">
          <Input
            name="assignedSection"
            value={form.assignedSection}
            onChange={handleChange}
            placeholder="Assigned Section (e.g. Cattle, Poultry)"
          />
          <Input
            name="experienceYears"
            type="number"
            value={form.experienceYears}
            onChange={handleChange}
            placeholder="Years of Experience"
          />
        </Section>
      )}

      {/* BIO */}
      <Section title="Bio">
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm resize-none font-poppins
            bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600
            text-zinc-800 dark:text-zinc-300
            focus:outline-none focus:ring-1 focus:ring-neutral-500 transition duration-200" 
          rows={4}
          changesize="none"
          placeholder="Tell us about yourself…"
        />
      </Section>

      <div className="flex justify-end">
        <Button 
        className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
              font-poppins text-slate-100 shadow-lg hover:shadow-xl
              dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
              transition duration-300"
        onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;

/* ---------------- COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-4 font-poppins">
    <h3 className="font-medium">{title}</h3>
    {children}
  </div>
);

const ReadOnly = ({ label, value }) => (
  <div className="flex flex-col gap-2 font-poppins">
    <div className="text-xs text-zinc-700 dark:text-zinc-500 font-poppins">{label}</div>
    <div className="text-sm text-zinc-800 dark:text-zinc-300 font-medium font-poppins">{value}</div>
  </div>
);

const Shimmer = ({ className }) => (
  <div
    className={`animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700 ${className}`}
  />
);


const ProfileSkeleton = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <Shimmer className="h-8 w-40" />

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-3"
        >
          <Shimmer className="h-5 w-32" />

          <Shimmer className="h-9 w-full" />
          <Shimmer className="h-9 w-full" />

          <div className="grid grid-cols-2 gap-3">
            <Shimmer className="h-9 w-full" />
            <Shimmer className="h-9 w-full" />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Shimmer className="h-9 w-32" />
      </div>
    </div>
  );
};
