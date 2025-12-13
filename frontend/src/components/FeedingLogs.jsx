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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/feeding/animal/${animalId}`);
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to fetch feeding logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [animalId]);

  const handleCreate = () => {
    setEditingLog(null);
    setOpen(true);
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete feeding log?")) return;
    await api.delete(`/feeding/${id}`);
    fetchLogs();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Feeding Logs</h1>
        <Button onClick={handleCreate}>+ Add Feeding</Button>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading logs…</div>
      ) : (
        <FeedingLogTable
          logs={logs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <FeedingLogModal
        open={open}
        setOpen={setOpen}
        log={editingLog}
        animalId={animalId}
        onSuccess={fetchLogs}
      />
    </AdminLayout>
  );
};

export default FeedingLogs;
