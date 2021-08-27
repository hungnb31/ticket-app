import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign In", route: "/auth/signin" },
    !currentUser && { label: "Sign Up", route: "/auth/signup" },
    currentUser && { label: "Sign Out", route: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, route }) => {
      return (
        <li key={route} className="nav-item ml-3">
          <Link href={route}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light px-5">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
