function Signup() {
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
            Create Account
          </h2>
          <p className="text-muted mb-3">Join Cake Aura today</p>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="form-control mb-3"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          className="form-control mb-3"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create Password"
          className="form-control mb-3"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control mb-3"
        />

        {/* Signup Button */}
        <button className="btn w-100 text-white mb-2" style={{ backgroundColor: "#ff6f91" }}>
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-center mt-2">
          Already have an account?{" "}
          <a href="/login" style={{ color: "#ff6f91", fontWeight: "bold" }}>Login</a>
        </p>

      </div>
    </div>
  );
}

export default Signup;
