import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden relative">
        <div className="w-full h-full bg-primary"></div>
        <div className="w-full h-full absolute animate-spin">
          <div className="w-1/2 h-1/2 bg-accent"></div>
        </div>
        <div className="w-8 h-8 rounded-full absolute z-20 bg-primary_opaque"></div>
      </div>
    </div>
  );
};

export default Loading;
