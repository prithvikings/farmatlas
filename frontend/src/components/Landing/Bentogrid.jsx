import React from "react";
import { BentoItem } from "../BentoItem";

const Bentogrid = () => {
  return (
    <div className="bento">
      <h1 className="font-roboto text-2xl selection:bg-[#EA580C] selection:text-zinc-100">
        All Your Farm Data. Managed by Role.
      </h1>
      <BentoItem />
    </div>
  );
};

export default Bentogrid;
