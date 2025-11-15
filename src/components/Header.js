import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [searchItem, setSearchItem] = useState("");
  const onSearch = (value) => {
    setSearchItem(value);
  };

  return (
    <header className="py-2 bg-light shadow-sm">
      <div className="container-fluid px-4">
        <div
          className="d-flex align-items-center justify-content-between flex-nowrap"
          style={{ whiteSpace: "nowrap" }}
        >
          {/* Left: Logo + Brand */}
          <div className="d-flex align-items-center flex-shrink-0">
            <img
               src="/assets/logo.jpg"
              alt="Logo"
              className="me-2"
              style={{ height: "55px", width: "55px", borderRadius:"26px" }}
            />
            {/* <span
              className="fw-bold"
              style={{
                color: "#c15b78",
                fontSize: "1.5rem",
                lineHeight: "1",
                display: "inline-block",
              }}
            >
              Varunavi Cake's
            </span> */}
            <h1
              className="mb-0 fw-bold brandName"
            >
              CAKE Aura
            </h1>
          </div>

          {/* Middle: Search Bar */}
          <div
            className="d-flex align-items-center mx-3 flex-grow-1"
            style={{
              maxWidth: "400px",
              minWidth: "250px",
              whiteSpace: "nowrap",
            }}
          >
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search cakes..."
              onChange={(e) => onSearch(e.target.value)}
              style={{
                backgroundColor: "#ffe8ef",
                border: "none",
                flexGrow: 1,
              }}
            />
            <i
              className="fas fa-search ms-2"
              style={{ color: "#c15b78" }}
            ></i>
          </div>

          {/* Right: Navigation */}
          <nav
            className="d-flex align-items-center flex-shrink-0"
            style={{ whiteSpace: "nowrap" }}
          >
            <a href="/track-order" className="nav-link text-dark fw-medium me-3 fontSet">
              <i
                className="fas fa-truck me-1"
                style={{ color: "#c15b78" }}
              ></i>
              Track Order
            </a>
            <Link href="/cart" className="nav-link text-dark fw-medium me-3 fontSet">
              <i
                className="fas fa-shopping-cart me-1"
                style={{ color: "#c15b78" }}
              ></i>
              Cart
            </Link>
            <a href="/login" className="nav-link text-dark fw-medium fontSet">
              <i
                className="fas fa-user me-1"
                style={{ color: "#c15b78" }}
              ></i>
              Login/Sign Up
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
