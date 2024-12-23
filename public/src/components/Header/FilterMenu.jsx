const FilterMenu = ({ isMobile }) => {
  return (
    <ul
      id='filters'
      className={isMobile ? 'w-fit h-fit' :'absolute top-[100%] left-2/4 -translate-x-1/2 shadow p-3 w-fit h-fit'}
    >
      <li className='text-nowrap py-1 px-2 border-b border-slate-400 cursor-pointer hover:bg-amber-300 hover:bg-opacity-40'>
        By date
      </li>
      <li className='text-nowrap py-1 px-2 border-b border-slate-400 cursor-pointer hover:bg-amber-300 hover:bg-opacity-40'>
        By priority
      </li>
      <li className='text-nowrap py-1 px-2 border-b border-slate-400 cursor-pointer hover:bg-amber-300 hover:bg-opacity-40'>
        By completion
      </li>
      <li className='text-nowrap py-1 px-2 border-b border-slate-400 cursor-pointer hover:bg-amber-300 hover:bg-opacity-40'>
        See past tasks
      </li>
    </ul>
  );
};

export default FilterMenu;
