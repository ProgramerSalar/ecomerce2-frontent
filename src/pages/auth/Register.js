import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email}. click the link to complete your registration`
    );

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control hover:bg-slate-100 hover:text-2xl "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <div className="p-2 text-center ">
        <button
          type="submit"
          className="btn btn-raised hover:bg-slate-500 hover:text-black p-2 hover:text-xl bg-yellow-100"
        >
          Register
        </button>
      </div>
    </form>
  );
  return (
    <div>
      <div className="container p-2">
        <div className="row-auto ">
          <h4 className="p-2 text-3xl text-blue-600 text-ellipsis  ">
            Register
          </h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
