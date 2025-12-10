// middleware/checkFarmOwnership.js

export const checkFarmOwnership = (model) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id; // AnimalId, InventoryId, etc.

      const resource = await model.findById(resourceId);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (resource.farmId.toString() !== req.user.farmId) {
        return res.status(403).json({ message: "Forbidden: Wrong farm access" });
      }

      req.resource = resource; // optional: forward to controllers
      next();

    } catch (error) {
      return res.status(500).json({ message: "Error validating farm access" });
    }
  };
};
