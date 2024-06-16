import { IconButton } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SourceIcon from "@mui/icons-material/Source";
export default function Header({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <SourceIcon fontSize="large" />
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <h3 className="nav-link  text-white text-capitalize mt-1">
                Hello,{user}
              </h3>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <IconButton variant="contained" onClick={(e) => handleLogout()}>
            <LogoutIcon fontSize="large" color="error" />
          </IconButton>
        </div>
      </nav>
    </div>
  );
}
