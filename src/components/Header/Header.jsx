import logo from "../../assets/idea theorem logo.png";

function Header() {
  return (
    <>
      <header>
        <nav className="header">
          <div className="logo-wrap">
            <a href="/" className="flex items-center">
              <img src={logo} className="" alt="Logo" width={294} height={32} />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
