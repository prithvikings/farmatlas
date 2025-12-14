const UserTable = ({ users }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b bg-zinc-100 dark:bg-zinc-700 font-roboto">
          <tr className="text-left">
            <th className="p-3 text-zinc-800 dark:text-zinc-300">Name</th>
            <th className="p-3 text-zinc-800 dark:text-zinc-300">Email</th>
            <th className="p-3 text-zinc-800 dark:text-zinc-300">Role</th>
            <th className="p-3 text-zinc-800 dark:text-zinc-300">Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr
              key={u._id}
              className="border-t font-poppins odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-200 dark:even:bg-zinc-900"
            >
              <td className="p-3 text-zinc-900 dark:text-zinc-200">{u.name}</td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {u.email}
              </td>
              <td className="p-3 font-medium text-zinc-900 dark:text-zinc-200">
                {u.role}
              </td>
              <td className="p-3 text-zinc-500 ">
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
