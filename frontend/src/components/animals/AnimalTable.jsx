import AnimalRowActions from "./AnimalRowActions";

const AnimalTable = ({ animals, onEdit, onDelete }) => {
  if (!animals.length) {
    return <div className="text-sm text-zinc-500">No animals found.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700">
          <tr>
            <th className="p-3 text-left">Tag</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Species</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal._id} className="border-t">
              <td className="p-3">{animal.tagNumber}</td>
              <td className="p-3">{animal.name}</td>
              <td className="p-3">{animal.species}</td>
              <td className="p-3">{animal.status}</td>
              <td className="p-3 text-right">
                <AnimalRowActions
                  animal={animal}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalTable;
