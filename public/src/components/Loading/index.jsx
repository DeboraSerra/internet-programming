import { FaSpinner } from "react-icons/fa";

const Loading = ({ size = 40 }) => {
  return (
    <div className='w-full h-full max-h-[40px] flex items-center justify-center'>
      <FaSpinner size={size} className='animate-spin' />
    </div>
  );
};

export default Loading;
