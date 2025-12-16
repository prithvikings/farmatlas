import AnimalRowActions from "./AnimalRowActions";

const AnimalCard = ({
  animal,
  canEdit,
  canDelete,
  canFeed,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Tag</span>
        <span className="font-medium">{animal.tagNumber}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Name</span>
        <span>{animal.name}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Species</span>
        <span>{animal.species}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Status</span>
        <span>{animal.status}</span>
      </div>

      {(canEdit || canFeed) && (
        <div className="pt-2 flex justify-end">
          <AnimalRowActions
            animal={animal}
            canEdit={canEdit}
            canDelete={canDelete}
            canFeed={canFeed}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default AnimalCard;
