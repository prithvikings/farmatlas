import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { useOutletContext } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getProfileCompletion } from "../helper/getProfileCompletion";

const Profile = () => {
  const { user, setUser } = useAuth();
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [liveCompletion, setLiveCompletion] = useState(null);

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

  // 👇 USE LIVE FIRST
  const completion = liveCompletion ?? user?.profileCompletion ?? 0;

  useEffect(() => {
    api
      .get("/profile/me")
      .then((res) => {
        const u = res.data;

        setEmail(u.email);

        const initialForm = {
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
        };

        setForm(initialForm);

        // ✅ compute from fresh backend data
        const initialCompletion = getProfileCompletion(
          { role: u.role, profile: u.profile, name: u.name },
          initialForm
        );

        setLiveCompletion(initialCompletion);
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);

    const percent = getProfileCompletion(user, updatedForm);
    setLiveCompletion(percent);
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

      setUser(res.data.user);
      setLiveCompletion(res.data.user.profileCompletion);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <>
      {/* ===== HEADER (MATCHES ANIMALS PAGE) ===== */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-3xl font-medium font-poppins">
            My Profile
          </h1>

          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md border
                bg-white dark:bg-zinc-800
                hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* ===== PROFILE COMPLETION ===== */}
      <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium font-poppins">
            Profile Completion
          </span>
          <span className="text-sm font-poppins">{completion}%</span>
        </div>

        <div className="w-full h-2 rounded bg-zinc-200 overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>

        {completion < 80 && (
          <p className="text-xs text-zinc-500 mt-2 font-poppins">
            Complete your profile to unlock all features.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {/* ===== BASIC INFO ===== */}
        <Section title="Basic Information">
          <Input name="name" value={form.name} onChange={handleChange} />
          <ReadOnly label="Email" value={email} />
          <ReadOnly label="Role" value={role} />
        </Section>

        {/* ===== CONTACT ===== */}
        <Section title="Contact Details">
          <Input name="phone" value={form.phone} onChange={handleChange} />
          <Input
            name="emergencyContact"
            value={form.emergencyContact}
            onChange={handleChange}
          />
          <Input name="address" value={form.address} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-3">
            <Input name="city" value={form.city} onChange={handleChange} />
            <Input name="state" value={form.state} onChange={handleChange} />
          </div>
          <Input name="country" value={form.country} onChange={handleChange} />
        </Section>

        {/* ===== ROLE-SPECIFIC ===== */}
        {user.role === "VET" && (
          <Section title="Veterinary Info">
            <Input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
            />
            <Input
              name="experienceYears"
              type="number"
              value={form.experienceYears}
              onChange={handleChange}
            />
          </Section>
        )}

        {user.role === "WORKER" && (
          <Section title="Work Info">
            <Input
              name="assignedSection"
              value={form.assignedSection}
              onChange={handleChange}
            />
            <Input
              name="experienceYears"
              type="number"
              value={form.experienceYears}
              onChange={handleChange}
            />
          </Section>
        )}

        {/* ===== BIO ===== */}
        <Section title="Bio">
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded p-2 text-sm resize-none"
          />
        </Section>

        <div className="flex justify-end">
          <Button
            className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 shadow-lg hover:shadow-xl dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300"
            onClick={handleSave}
            disabled={saving}
          >
            {" "}
            {saving ? "Saving..." : "Save Changes"}{" "}
          </Button>
        </div>
      </div>
    </>
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
    <div className="text-xs text-zinc-700 dark:text-zinc-500 font-poppins">
      {label}
    </div>
    <div className="text-sm text-zinc-800 dark:text-zinc-300 font-medium font-poppins">
      {value}
    </div>
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
