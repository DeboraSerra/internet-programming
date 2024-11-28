import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FilterMenu from "./FilterMenu";
import { useParams, useRouter } from "next/navigation";

const HeaderMenu = ({ isMobile }) => {
  const [renderFilters, setRenderFilters] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  async function logOut() {
    const url = await auth.logOut();
    url && router.push(url);
    toastEmitter.emit(TOAST_EMITTER_KEY, "Logout successful");
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
    <div
      className={
        isMobile
          ? "menu flex flex-col absolute right-4 top-full px-4 py-2 text-left w-[167px] shadow-lg z-10"
          : "flex gap-4"
      }
    >
      <button
        onMouseEnter={() => !isMobile && mouseIn()}
        onMouseLeave={() => !isMobile && mouseOut()}
        onClick={() => isMobile && setRenderFilters(!renderFilters)}
        className={
          isMobile
            ? "text-nowrap pt-1 border-b border-slate-400 cursor-pointer text-lg"
            : "relative flex flex-col items-center text-lg"
        }
      >
        <p
          className={
            isMobile
              ? "flex items-center gap-2 cursor-pointer"
              : "flex items-center gap-2 cursor-default"
          }
        >
          Filter tasks {renderFilters ? <FaChevronUp /> : <FaChevronDown />}
        </p>
        {renderFilters ? <FilterMenu isMobile={isMobile} /> : null}
      </button>
      <button
        onClick={profile}
        className={
          isMobile
            ? "text-nowrap py-1 px-2 border-b border-slate-400 cursor-pointer text-lg"
            : "relative flex flex-col items-center text-lg hover:underline"
        }
      >
        Profile
      </button>
      <button
        onClick={logOut}
        className={
          isMobile
            ? "text-nowrap py-1 px-2 border-b border-slate-400 cursor-pointer text-lg"
            : "relative flex flex-col items-center text-lg hover:underline"
        }
      >
        Log out
      </button>
    </div>
  );
};

export default HeaderMenu;
