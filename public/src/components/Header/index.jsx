"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronUp,
  FaRegPlusSquare,
} from "react-icons/fa";
import * as auth from "../../../assets/script/auth";
import FilterMenu from "./FilterMenu";

function Header() {
  const [renderFilters, setRenderFilters] = useState(false);
  const location = usePathname();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    auth.onLoadUser().then((user) => {
      console.log({user})
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

  async function logOut() {
    const url = await auth.logOut();
    url && router.push(url);
  }

  async function newTask() {
    router.push(`/${id}/new-task`);
  }

  async function back() {
    router.push(`/${id}/dashboard`);
  }

  async function profile() {
    router.push(`/${id}`);
  }

  const mouseIn = () => {
    setRenderFilters(true);
  };

  const mouseOut = () => {
    setRenderFilters(false);
  };

  return (
    <header className='flex py-3 px-8 justify-between'>
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
      <div className='flex gap-4'>
        <div
          onMouseEnter={mouseIn}
          onMouseLeave={mouseOut}
          className='relative flex flex-col items-center text-lg'
        >
          <p className='flex items-center gap-2 cursor-default'>
            Filter tasks {renderFilters ? <FaChevronUp /> : <FaChevronDown />}
          </p>
          {renderFilters ? <FilterMenu /> : null}
        </div>
        <button
          onClick={profile}
          className='relative flex flex-col items-center text-lg hover:underline'
        >
          Profile
        </button>
        <button
          onClick={logOut}
          className='relative flex flex-col items-center text-lg hover:underline'
        >
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
