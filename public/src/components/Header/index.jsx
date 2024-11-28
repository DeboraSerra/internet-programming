"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaRegPlusSquare } from "react-icons/fa";
import * as auth from "../../../assets/script/auth";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = usePathname();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    auth.onLoadUser().then((user) => {
      if (user.id) {
        if (!location.includes(user.id)) {
          router.push(`/${user.id}/dashboard`);
        }
        localStorage.setItem("userData", JSON.stringify(user));
      } else {
        localStorage.removeItem("userData");
        router.push("/");
      }
    });
  }, []);

  async function newTask() {
    router.push(`/${id}/new-task`);
  }

  async function back() {
    router.push(`/${id}/dashboard`);
  }

  return (
    <header className='flex py-3 px-8 justify-between items-center relative'>
      {location.includes("dashboard") ? (
        <button
          onClick={newTask}
          className='flex items-center gap-2 text-lg hover:underline'
        >
          <FaRegPlusSquare size={24} />
          New task
        </button>
      ) : (
        <button onClick={back} className='flex items-center gap-2 text-lg'>
          <FaChevronLeft size={24} />
        </button>
      )}
      {isMobile ? (
        <>
          <button
            className='relative flex flex-col justify-between items-center gap-2 w-8 h-8'
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className={`h-1 bg-slate-900 rounded-xl w-full ${showMenu ? "rotate-45 translate-y-4" : ""}`}></span>
            {!showMenu && <span className={'h-1 bg-slate-900 rounded-xl w-full'}></span>}
            <span className={`h-1 bg-slate-900 rounded-xl w-full  ${showMenu ? "-rotate-45 -translate-y-3" : ""}`}></span>
          </button>
          {showMenu && <HeaderMenu isMobile={isMobile} />}
        </>
      ) : (
        <HeaderMenu isMobile={isMobile} />
      )}
    </header>
  );
}

export default Header;
