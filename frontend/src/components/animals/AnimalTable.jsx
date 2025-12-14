import AnimalRowActions from "./AnimalRowActions";

const AnimalTable = ({
  animals,
  canEdit,
  canDelete,
  canFeed,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
          <tr>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Tag
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Name
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Species
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Status
            </th>
            {(canEdit || canFeed) && (
              <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr
              key={animal._id}
              className="border-t font-poppins font-medium odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-00 dark:even:bg-zinc-900"
            >
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {animal.tagNumber}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {animal.name}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {animal.species}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {animal.status}
              </td>

              {(canEdit || canFeed) && (
                <td className="p-3 text-right">
                  <AnimalRowActions
                    animal={animal}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    canFeed={canFeed}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalTable;
