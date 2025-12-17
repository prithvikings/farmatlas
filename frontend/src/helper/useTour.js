import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useLivestockTour = (steps) => {
  // Use a ref to keep the driver instance stable across renders
  const driverObj = useRef(null);

  useEffect(() => {
    // Initialize Driver.js 1.0+
    driverObj.current = driver({
      showProgress: true,
      animate: true,
      // Crucial: Allow users to click interactions inside the highlighted element
      allowClose: true,
      steps: steps || [],
      onDestroyed: () => {
        // Optional: Save to localStorage so you don't annoy them again
        // localStorage.setItem('tour_seen', 'true');
      },
    });

    return () => {
      // Cleanup if component unmounts abruptly
      if (driverObj.current) {
        driverObj.current.destroy();
      }
    };
  }, [steps]);

  const startTour = () => {
    if (driverObj.current) {
      driverObj.current.drive();
    }
  };

  return { startTour };
};
