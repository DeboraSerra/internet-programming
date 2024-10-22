const { default: Header } = require("@/components/Header");

function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
