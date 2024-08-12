import React, { ReactNode, useState } from 'react';

const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex flex-col items-center group">
      <span
        className="flex justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      <div
        className={`absolute whitespace-nowrap bottom-full flex flex-col items-center group-hover:flex ${
          !show ? 'hidden' : null
        }`}
      >
        <span className="relative z-10 p-2 mb-1.5 w-20 text-wrap text-center text-[10px] leading-none text-white whitespace-no-wrap border-green-400 border-2 bg-black shadow-lg rounded-md">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
