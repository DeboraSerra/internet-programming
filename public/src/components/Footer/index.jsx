const Footer = () => {
  return (
    <footer className='container mx-auto flex justify-between items-center text-sm py-4 text-slate-700'>
      <p className="font-bold">TechTide - Internet Programming</p>
      <div className="flex gap-2">
        <p className="font-bold">Project developed by:</p>
        <ul className="flex gap-2 max-h-20 flex-wrap">
          <li>
            <a className="underline hover:text-slate-900" href='https://github.com/DeboraSerra'>Debora Serra</a>
          </li>
          <li>
            <a className="underline hover:text-slate-900" href='https://github.com/bscaramu'>Bruno Scaramutti</a>
          </li>
          <li>
            <a className="underline hover:text-slate-900" href='https://github.com/leansouz4'>Leandro Souza</a>
          </li>
          <li>
            <a className="underline hover:text-slate-900" href='https://github.com/Berraiz'>João Neves</a>
          </li>
          <li>
            <a className="underline hover:text-slate-900" href='https://github.com/Uchral02'>Uchral Tamir</a>
          </li>
        </ul>
      </div>
      <p>
        Codebase available in:{" "}
        <a className="underline hover:text-slate-900" href='https://github.com/DeboraSerra/internet-programming'>GitHub</a>
      </p>
    </footer>
  );
};

export default Footer;
