"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const NotFound = () => {
  const { id } = useParams();
  return (
    <div className='container mx-auto py-8 h-screen flex flex-col gap-10 justify-center items-center'>
      <h1 className='text-3xl font-bold'>404</h1>
      <h2 className='text-lg text-center'>
        Sorry... We coudn&apos;t find the page you are looking for...
      </h2>
      <div className="flex gap-4 items-center justify-center">
        <Link
          href={`/${id}/dashboard`}
          className='flex items-center text-blue-500 text-xl underline hover:text-blue-600'
        >
          Go to dashboard
        </Link>
        <Link
          href={`/${id}/new-task`}
          className='flex items-center text-blue-500 text-xl underline hover:text-blue-600'
        >
          Create a new task
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
