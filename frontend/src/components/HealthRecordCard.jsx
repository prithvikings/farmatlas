import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

const HealthRecordCard = ({ record, canEdit, onEdit }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Animal</span>
        <span className="font-medium">
          {record.animalId?.tagNumber} — {record.animalId?.name}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Type</span>
        <span>{record.type}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Date</span>
        <span>{new Date(record.date).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Medication</span>
        <span>{record.medication || "—"}</span>
      </div>

      {record.notes && (
        <div className="pt-2 text-sm text-zinc-600 dark:text-zinc-300">
          {record.notes}
        </div>
      )}

      {canEdit && (
        <div className="pt-3 flex justify-end">
          <Button
            size="sm"
            className="bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
                       font-poppins text-slate-100"
            onClick={() => onEdit(record)}
          >
            <Pencil className="mr-2 size-4" /> Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default HealthRecordCard;
