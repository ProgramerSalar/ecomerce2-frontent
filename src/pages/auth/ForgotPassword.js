import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("check your email for password resnet Link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR Msg in forgot password", error);
      });
  };
  return (
    <div className="container columns-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">loading</h4>
      ) : (
        <h4 className="text-2xl text-red-600 p-3">forgot password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <input
            type="email"
            className="form-control hover:bg-slate-200 hover:text-lg hover:text-blue-600 bg-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email"
            autoFocus
          ></input>
        </div>

        <br />
        <button
          className="btn btn-raised hover:text-lg hover:bg-slate-900 hover:text-blue-900 bg-slate-300"
          disabled={!email}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
