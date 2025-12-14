import { useEffect, useState } from "react";
import WorkerLayout from "./WorkerLayout";
import api from "../lib/axios";
import { LargeCard } from "../components/dashboard/AdminCards";
import { Link } from "react-router-dom";

const WorkerDashboard = () => {
  const [healthCount, setHealthCount] = useState(0);
  const [recentFeeding, setRecentFeeding] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, feedingRes, inventoryRes] = await Promise.all([
          api.get("/health/issues/summary"),
          api.get("/feeding?limit=5"),
          api.get("/inventory/item"),
        ]);

        setHealthCount(healthRes.data.count);
        setRecentFeeding(feedingRes.data.items);

        const low = inventoryRes.data.filter(
          (i) => i.quantity <= i.lowStockThreshold
        );
        setLowStock(low);
      } catch (err) {
        console.error("Worker dashboard load failed", err);
      }
    };

    fetchData();
  }, []);

  return (
    <WorkerLayout>
      <div className="grid grid-cols-2 gap-6">
        {/* Health Alerts */}
        <LargeCard title="Health Alerts">
          <div className="text-4xl font-bold text-red-600">
            {healthCount}
          </div>
          <p className="text-sm text-zinc-500">
            Animals need attention
          </p>
          <Link
            to="/worker/health"
            className="text-sm text-blue-600 mt-2 inline-block"
          >
            View health records →
          </Link>
        </LargeCard>

        {/* Recent Feeding */}
        <LargeCard title="Recent Feeding">
          <div className="space-y-2 text-sm">
            {recentFeeding.length === 0 && (
              <div className="text-zinc-500">No recent feeding logs</div>
            )}

            {recentFeeding.map((f) => (
              <div key={f._id} className="flex justify-between">
                <span>{f.animal?.name}</span>
                <span>
                  {f.quantity} {f.unit}
                </span>
              </div>
            ))}
          </div>
        </LargeCard>

        {/* Inventory Alerts */}
        <LargeCard title="Low Stock Alerts">
          {lowStock.length === 0 ? (
            <p className="text-sm text-green-600">
              Inventory levels OK
            </p>
          ) : (
            <div className="space-y-1 text-sm">
              {lowStock.map((i) => (
                <div key={i._id} className="flex justify-between">
                  <span>{i.name}</span>
                  <span className="text-red-600">
                    {i.quantity} {i.unit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </LargeCard>
      </div>
    </WorkerLayout>
  );
};

export default WorkerDashboard;
