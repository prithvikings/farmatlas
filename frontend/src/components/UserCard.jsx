const UserCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Name</span>
        <span className="font-medium">{user.name}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Email</span>
        <span className="text-sm">{user.email}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Role</span>
        <span className="font-medium">{user.role}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Created</span>
        <span className="text-sm text-zinc-500">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
