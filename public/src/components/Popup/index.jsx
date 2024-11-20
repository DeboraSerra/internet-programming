"use client";
import { useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";

const Popup = ({ children, setOpen }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (e) => {
    const target = e.target;
    if (!target?.isConnected) {
      return;
    }

    const isOutside = popupRef.current && !popupRef.current.contains(target);

    if (isOutside) {
      setOpen(false);
    }
  };

  // useEffect(() => {
  //   window.addEventListener("click", handleClickOutside);
  //   return () => window.removeEventListener("click", handleClickOutside);
  // }, []);

  return (
    <div className='bg-slate-800 bg-opacity-70 absolute w-screen h-screen top-0 left-0'>
      <div
        ref={popupRef}
        className='popup__body absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1/2 h-1/2'
      >
        <MdOutlineClose size={24} onClick={() => setOpen(false)} className="absolute cursor-pointer right-2 top-2" />
        {children}
      </div>
    </div>
  );
};

export default Popup;
