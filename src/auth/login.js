import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const handlelogin = () => {
        // Implement login logic here
        navigate("/");
        alert("Login function called");
    }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh", backgroundColor: "#fff0f5"}}>
      
      <div className="card p-4 shadow-lg" style={{ width: "380px", borderRadius: "15px" }}>
        
        <div className="text-center">
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="rounded-circle mb-3"
            style={{ height: "80px", width: "80px" }}
          />

          <h2 className="fw-bold" style={{ color: "#ff6f91", fontFamily: "Playfair Display, serif" }}>
            Cake Aura
          </h2>
        </div>

        {/* Username */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter username/email"
            className="form-control mb-3"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            className="form-control mb-3"
          />
        </div>

        {/* Buttons */}
        <button className="btn w-100 text-white mb-2" style={{ backgroundColor: "#ff6f91" }} onClick={()=>handlelogin()}>
          Login
        </button>
        <button className="btn w-100" style={{ backgroundColor: "#ffd1dc" }} onClick={() => navigate("/signup")}>
          Sign Up
        </button>

      </div>
    </div>
  );
}

export default Login;
