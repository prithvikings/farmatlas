const ProfileBadge = ({ percent }) => {
  const color =
    percent >= 80
      ? "bg-green-500"
      : percent >= 50
      ? "bg-orange-500"
      : "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full bg-zinc-300 overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-zinc-600 dark:text-zinc-300">
        {percent}%
      </span>
    </div>
  );
};

export default ProfileBadge;
