import { Link } from "react-router-dom";
import { Pencil, Trash, Utensils } from "lucide-react";

const AnimalRowActions = ({ animal, onEdit, onDelete }) => {
  return (
    <div className="flex justify-end gap-3">
      
      {/* Feeding Logs */}
      <Link
        to={`/admin/animals/${animal._id}/feeding`}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        title="Feeding Logs"
      >
        <Utensils size={16} />
      </Link>

      {/* Edit */}
      <button
        onClick={() => onEdit(animal)}
        className="text-zinc-600 hover:text-zinc-900"
        title="Edit"
      >
        <Pencil size={16} />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(animal._id)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};

export default AnimalRowActions;
