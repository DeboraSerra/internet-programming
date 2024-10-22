import Login from "@/components/Login";


export default function Home() {
  return (
    <div className='flex flex-col items-center pt-40 min-h-screen'>
      <h1 className='mb-20 font-bold text-4xl'>Welcome</h1>
      <h2 className='text-2xl mb-16'>Log in to keep track of your tasks!</h2>
      <Login />
    </div>
  );
}
