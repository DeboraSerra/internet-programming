"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import * as auth from "../../../assets/script/auth";

function Header() {
  const location = usePathname();
  const { id } = useParams();
  const router = useRouter();

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

  return (
    <header className='flex py-3 px-8 justify-between'>
      {location.includes("dashboard") ? (
        <button onClick={newTask}>New task</button>
      ) : (
        <button onClick={back}>Back</button>
      )}
      <div className="flex gap-4">
        <ul>
          <p>Filter by</p>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <button onClick={profile}>Profile</button>
        <button onClick={logOut}>Log out</button>
      </div>
    </header>
  );
}

export default Header;
