import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { createorUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must have atleast 6 characters");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redux storage
        console.log("user", user, "idTokenResult", idTokenResult);

        createorUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="p-2">
        <input
          type="email"
          className="form-control"
          value={email}
          disabled
        ></input>
      </div>
      <div className="p-2">
        <input
          type="password"
          className="form-control hover:bg-slate-300 hover:text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoFocus
        ></input>
      </div>

      <br />
      <button
        type="subimt"
        className="btn btn-raised bg-red-400 cursor-pointer hover:to-blue-600 hover:text-green-800 hover:bg-blue-400 hover:text-xl"
      >
        complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row-auto">
        <div className="col-md">
          <h4 className="text-4xl text-blue-500 p-3"> Register complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
