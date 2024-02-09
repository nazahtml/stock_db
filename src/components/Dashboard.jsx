import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/dash.css";
import { useQuery } from "react-query";
import Loader from "./Loader/Loader";

function Dashboard({ setIsAuth }) {

  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [isSubMenuActive, setSubMenuActive] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuActive(!isSubMenuActive);
  };

  const {
    data: res,
    isLoading,
    isError,
  } = useQuery("dashboardData", async () => {
    const response = await fetch("http://localhost:4000/dashboard/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  });

  const information = res?.user || [];
  const roleUser = res?.role || "";

  const LogOut = (e) => {
    e.preventDefault();
    setIsAuth(false);
  };

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div classname="containerr">
        <div className={`navigation ${isNavOpen ? "active1" : ""}`}>
          <ul>
            <li>
              <NavLink to="/dashboard">
                <span className="icon">
                  <ion-icon name="home"></ion-icon>
                </span>
                <span className="title-link">Gestion de Stock</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">
                <span className="icon">
                  <ion-icon name="home"></ion-icon>
                </span>
                <span className="title-link">Acceuil</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Stocks">
                <span className="icon">
                  <ion-icon name="storefront"></ion-icon>
                </span>
                <span className="title-link">Stocks</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Commandes">
                <span className="icon">
                  <ion-icon name="clipboard"></ion-icon>
                </span>
                <span className="title-link">Commandes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Statistiques">
                <span className="icon">
                  <ion-icon name="pie-chart"></ion-icon>
                </span>
                <span className="title-link">Statistiques</span>
              </NavLink>
            </li>
            <li>
              {roleUser === 'admin' && (
                <NavLink to="/Utilisateurs">
                  <span className="icon">
                    <ion-icon name="person"></ion-icon>
                  </span>
                  <span className="title-link">Utilisateurs</span>
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to="/Directions-Bureaus">
                <span className="icon">
                  <ion-icon name="briefcase"></ion-icon>
                </span>
                <span className="title-link">Directions & Bureaus</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Fournisseurs">
                <span className="icon">
                  <ion-icon name="cart"></ion-icon>
                </span>
                <span className="title-link">Fournisseurs</span>
              </NavLink>

            </li>
            <li>
              <button onClick={LogOut}>
                <span className="icon">
                  <ion-icon name="log-out"></ion-icon>
                </span>
                <span className="title-link">Se déconnecter</span>
              </button>

            </li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="topbar">
          <div class="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div class="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div class="user">
            <img src="https://tmazik.com/imgs/Lbenj.jpg" alt="" />
          </div>
        </div>
      </div>

    </>

  );
}
export default Dashboard;
