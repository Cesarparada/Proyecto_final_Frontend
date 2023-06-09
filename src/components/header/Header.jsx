import React from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";

import {
  MdPersonOutline,
  MdOutlineLogout,
  MdKeyboardArrowDown,
  MdOutlineLogin,
} from "react-icons/md";

export default function Header() {
  // HOOKS
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == "admin";

  // HANDLERS
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };

  return (
    <div>
      <div className="Header">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            {isLoggedIn && !isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink to="/proyectos">Proyectos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/courses">Tareas</NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to="/about">About</NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink to="/admin">Admin</NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/login">
                    <MdOutlineLogin />
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item dropdown ">
                  <a>
                    <MdPersonOutline className="icon" />
                    {name} <MdKeyboardArrowDown />
                  </a>

                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li className="dropdown-item">
                      <a onClick={handleLogout}>
                        <MdOutlineLogout /> Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
