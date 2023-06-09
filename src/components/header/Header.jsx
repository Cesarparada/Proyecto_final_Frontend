import React from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdKeyboardArrowDown,
  MdOutlineLogin,
} from "react-icons/md";

export default function Header() {
  return (
    <div>
      <div className="Header">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/login">
                <MdOutlineLogin />
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register">Register</NavLink>
            </li>

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
                  {/* <a onClick={handleLogout}>
                    <MdOutlineLogout /> Logout
                  </a> */}
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
