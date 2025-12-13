import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import FeedingLogTable from "./FeedingLogTable";
import FeedingLogModal from "./FeedingLogModal";
import { Button } from "./ui/button";

const FeedingLogs = () => {
  const { animalId } = useParams();
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchLogs = async () => {
    const res = await api.get(`/feeding/animal/${animalId}`);
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, [animalId]);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Feeding Logs</h1>
        <Button onClick={() => setOpen(true)}>+ Add Feeding</Button>
      </div>

      <FeedingLogTable logs={logs} />

      <FeedingLogModal
        open={open}
        setOpen={setOpen}
        animalId={animalId}
        onSuccess={fetchLogs}
      />
    </AdminLayout>
  );
};

export default FeedingLogs;
