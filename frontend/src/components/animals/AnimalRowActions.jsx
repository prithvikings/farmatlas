import { Pencil, Trash, Utensils, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";

const AnimalRowActions = ({ animal, onEdit, onDelete }) => {
  return (
    <div className="flex justify-end gap-3">
      
      {/* Feeding */}
      <Link
        to={`/admin/animals/${animal._id}/feeding`}
        className="text-blue-600 hover:text-blue-800"
        title="Feeding Logs"
      >
        <Utensils size={16} />
      </Link>

      {/* Health */}
      <Link
        to={`/admin/animals/${animal._id}/health`}
        className="text-green-600 hover:text-green-800"
        title="Health Records"
      >
        <Clipboard size={16} />
      </Link>

      {/* Edit */}
      <button onClick={() => onEdit(animal)}>
        <Pencil size={16} />
      </button>

      {/* Delete */}
      <button onClick={() => onDelete(animal._id)}>
        <Trash size={16} />
      </button>
    </div>
  );
};

export default AnimalRowActions;
