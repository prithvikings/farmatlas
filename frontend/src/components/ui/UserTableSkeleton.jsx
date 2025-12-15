import { Shimmer } from "./Schimmer";

const UserTableSkeleton = ({ rows = 6 }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b bg-zinc-100 dark:bg-zinc-700">
          <tr>
            {["Name", "Email", "Role", "Created"].map((_, i) => (
              <th key={i} className="p-3">
                <Shimmer className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              key={i}
              className="border-t odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-200 dark:even:bg-zinc-900"
            >
              <td className="p-3">
                <Shimmer className="h-4 w-28" />
              </td>
              <td className="p-3">
                <Shimmer className="h-4 w-40" />
              </td>
              <td className="p-3">
                <Shimmer className="h-4 w-20" />
              </td>
              <td className="p-3">
                <Shimmer className="h-4 w-24" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableSkeleton;
