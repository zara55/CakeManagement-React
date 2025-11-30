// import React, { useState } from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";

// function Header() {
//   const [searchItem, setSearchItem] = useState("");
//   const onSearch = (value) => {
//     setSearchItem(value);
//   };

//   return (
//     <header className="py-2 bg-light shadow-sm">
//       <div className="container-fluid px-4">
//         <div
//           className="d-flex align-items-center justify-content-between flex-nowrap"
//           style={{ whiteSpace: "nowrap" }}
//         >
//           {/* Left: Logo + Brand */}
//           <div className="d-flex align-items-center flex-shrink-0">
//             <img
//                src="/assets/logo.jpg"
//               alt="Logo"
//               className="me-2"
//               style={{ height: "55px", width: "55px", borderRadius:"26px" }}
//             />
//             {/* <span
//               className="fw-bold"
//               style={{
//                 color: "#c15b78",
//                 fontSize: "1.5rem",
//                 lineHeight: "1",
//                 display: "inline-block",
//               }}
//             >
//               Varunavi Cake's
//             </span> */}
//             <h1
//               className="mb-0 fw-bold brandName"
//             >
//               CAKE Aura
//             </h1>
//           </div>

//           {/* Middle: Search Bar */}
//           <div
//             className="d-flex align-items-center mx-3 flex-grow-1"
//             style={{
//               maxWidth: "400px",
//               minWidth: "250px",
//               whiteSpace: "nowrap",
//             }}
//           >
//             <input
//               type="text"
//               className="form-control rounded-pill"
//               placeholder="Search cakes..."
//               onChange={(e) => onSearch(e.target.value)}
//               style={{
//                 backgroundColor: "#ffe8ef",
//                 border: "none",
//                 flexGrow: 1,
//               }}
//             />
//             <i
//               className="fas fa-search ms-2"
//               style={{ color: "#c15b78" }}
//             ></i>
//           </div>

//           {/* Right: Navigation */}
//           <nav
//             className="d-flex align-items-center flex-shrink-0"
//             style={{ whiteSpace: "nowrap" }}
//           >
//             <a href="/track-order" className="nav-link text-dark fw-medium me-3 fontSet">
//               <i
//                 className="fas fa-truck me-1"
//                 style={{ color: "#c15b78" }}
//               ></i>
//               Track Order
//             </a>
//             <a href="/cart" className="nav-link text-dark fw-medium me-3 fontSet">
//               <i
//                 className="fas fa-shopping-cart me-1"
//                 style={{ color: "#c15b78" }}
//               ></i>
//               Cart
//             </a>
//             <a href="/login" className="nav-link text-dark fw-medium fontSet">
//               <i
//                 className="fas fa-user me-1"
//                 style={{ color: "#c15b78" }}
//               ></i>
//               Login/Sign Up
//             </a>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
//receive props from layout
function Header({ searchItem, setSearchItem }) {
  // const [searchItem, setSearchItem] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const onSearch = (value) => {
    setSearchItem(value);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    alert("Logged out successfully!");
    navigate("/login");
  }

  return (
    <>
      {/* HEADER */}
      <header className="py-2 bg-light shadow-sm">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between flex-nowrap"
            style={{ whiteSpace: "nowrap" }}>

            {/* LEFT: MENU ICON + LOGO */}
            <div className="d-flex align-items-center flex-shrink-0">
              {/* MENU ICON */}
              <i
                className="fas fa-bars me-3 menu-icon"
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => setSidebarOpen(true)}
              ></i>

              {/* LOGO + BRAND clickable */}
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <img
                  src="/assets/logo.jpg"
                  alt="Logo"
                  className="me-2"
                  style={{ height: "55px", width: "55px", borderRadius: "26px" }}
                />
                <h1 className="mb-0 fw-bold brandName">CAKE Aura</h1>
              </div>
            </div>
            {/* SEARCH BAR */}
            <div className="d-flex align-items-center mx-3 flex-grow-1" style={{ maxWidth: "400px", minWidth: "250px" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  placeholder="Search cakes..."
                  style={{
                    width: "100%",
                    paddingRight: "30px", // space for X
                    borderRadius: "20px",
                    padding: "8px 12px",
                    backgroundColor: "#ffe8ef",
                    border: "none",
                  }}
                />
                {searchItem && (
                  <i
                    className="fas fa-times"
                    onClick={() => setSearchItem("")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#c15b78"
                    }}
                  />
                )}
              </div>
              <i className="fas fa-search ms-2" style={{ color: "#c15b78" }}></i>
            </div>


            {/* RIGHT NAVIGATION */}
            <nav className="d-flex align-items-center flex-shrink-0" style={{ whiteSpace: "nowrap" }}>
              <Link to="/track-order" className="nav-link text-dark fw-medium me-3 fontSet">
                <i className="fas fa-truck me-1" style={{ color: "#c15b78" }}></i>
                Track Order
              </Link>

              <Link to="/cart" className="nav-link text-dark fw-medium me-3 fontSet">
                <i className="fas fa-shopping-cart me-1" style={{ color: "#c15b78" }}></i>
                Cart
              </Link>

              {/* <Link to="/order-history" className="nav-link text-dark fw-medium me-3 fontSet">
                <i className="fas fa-list me-1" style={{ color: "#c15b78" }}></i>
                Your Orders
              </Link> */}

              <Link to="/login" className="nav-link text-dark fw-medium fontSet">
                <i className="fas fa-user me-1" style={{ color: "#c15b78" }}></i>
                Login/Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ×
        </button>

        <button
          className="sidebar-btn"
          onClick={() => {
            setSidebarOpen(false);
            navigate("/order-history"); // opens new page
          }}
        >
          Your Orders
        </button>

        <button className="sidebar-btn" onClick={() => navigate("/cart")}>
          Cart
        </button>

        <button className="sidebar-btn" onClick={() => navigate("/track-order")}>
          Track Order
        </button>

        <button className="sidebar-btn" onClick={() => navigate("/login")}>
          Login / Sign Up
        </button>
        <button className="sidebar-btn" onClick={() => logout()}>
          Logout
        </button>

      </div>
    </>
  );
}

export default Header;
