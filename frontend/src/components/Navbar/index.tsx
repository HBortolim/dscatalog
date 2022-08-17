import "./styles.css";
import "bootstrap/js/src/collapse.js";
import { Link, NavLink } from "react-router-dom";
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
  TokenData,
} from "util/requests";
import { useEffect, useState } from "react";
import history from "util/history";

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const [authData, setauthData] = useState<AuthData>({ authenticated: false });

  useEffect(() => {
    if (isAuthenticated()) {
      setauthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setauthData({
        authenticated: false,
      });
    }
  }, []);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setauthData({
      authenticated: false,
    });
    history.replace("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-login-logout">
          {authData.authenticated ? (
            <>
              <span className="nav-username">{authData.tokenData?.user_name}</span>
              <a href="#sad" onClick={handleLogoutClick}>
                Logout
              </a>
            </>
          ) : (
            <Link to="/admin/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
