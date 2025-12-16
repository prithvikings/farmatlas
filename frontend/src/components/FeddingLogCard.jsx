const FeedingLogCard = ({ log }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Animal</span>
        <span className="font-medium">
          {log.animalId?.tagNumber} – {log.animalId?.name}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Food</span>
        <span>{log.foodType}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Quantity</span>
        <span>
          {log.quantity} {log.unit}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Fed By</span>
        <span>
          {log.loggedBy?.name} ({log.loggedBy?.role})
        </span>
      </div>

      <div className="text-sm text-zinc-500 pt-1">
        {new Date(log.dateTime).toLocaleString()}
      </div>
    </div>
  );
};

const WorkerFeedingLogCard = ({ log }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Date</span>
        <span className="font-medium">
          {new Date(log.dateTime).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Food</span>
        <span>{log.foodType}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Quantity</span>
        <span>
          {log.quantity} {log.unit}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Notes</span>
        <span className="text-right">{log.notes || "—"}</span>
      </div>
    </div>
  );
};

export { FeedingLogCard, WorkerFeedingLogCard };
