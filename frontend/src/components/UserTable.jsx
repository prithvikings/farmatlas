const UserTable = ({ users }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 font-medium">{u.role}</td>
              <td className="p-3 text-zinc-500">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
