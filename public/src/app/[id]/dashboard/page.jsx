"use client";
import { useRouter } from "next/navigation";
import * as auth from "../../../../assets/script/auth";

function Dashboard() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          auth.logOut().then((url) => url && router.push(url));
        }}
      >
        Log Out
      </button>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
