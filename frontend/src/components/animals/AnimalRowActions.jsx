import { Edit, Trash2, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const AnimalRowActions = ({
  animal,
  canEdit,
  canDelete,
  canFeed,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="inline-flex gap-2">
      {canFeed && (
        <Link
          to={`/animals/${animal._id}/feeding`}
          className="p-2 rounded cursor-pointer transition duration-100 hover:bg-zinc-100 text-green-600 dark:hover:bg-zinc-700 dark:text-green-500"
          title="Feed Animal"
        >
          <Utensils size={16} />
        </Link>
      )}

      {canEdit && (
        <button
          onClick={() => onEdit(animal)}
          className="p-2 cursor-pointer transition duration-100 rounded hover:bg-zinc-100  text-blue-600 dark:hover:bg-zinc-700 dark:text-yellow-500"
        >
          <Edit size={16} />
        </button>
      )}

      {canDelete && (
        <button
          onClick={() => onDelete(animal._id)}
          className="p-2 rounded cursor-pointer transition duration-100 hover:bg-zinc-100 text-red-600 dark:hover:bg-zinc-700 dark:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export default AnimalRowActions;
