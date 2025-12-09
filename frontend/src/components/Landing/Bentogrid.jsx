import React from "react";
import { BentoItem } from "../BentoItem";

const Bentogrid = () => {
  return (
    <div className="bento">
      <h1 className="font-roboto text-2xl">
        All Your Farm Data. Managed by Role.
      </h1>
      <BentoItem />
    </div>
  );
};

export default Bentogrid;
