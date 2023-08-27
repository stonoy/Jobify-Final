import React from "react";

const StatItem = ({ name, count }) => {
  return (
    <div className="stat">
      <h3>{name}</h3>
      <h2>{count}</h2>
    </div>
  );
};

export default StatItem;
