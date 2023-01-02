import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createorUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/deshboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        //  history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="from-group">
        <div className="p-2 ">
          <input
            type="email"
            className="form-control hover:bg-slate-200 hover:text-xl hover:text-blue-700 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
            autoFocus
          ></input>
        </div>

        <div className="p-2">
          <input
            type="password"
            className="form-control  hover:bg-slate-200 hover:text-xl hover:text-blue-700 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="your password"
          ></input>
        </div>
        <br />
        <div>
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3 bg-slate-600 hover:text-lg"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6}
          >
            Login with Email / password
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row-auto">
        <div className="col-md">
          <div>
            {loading ? (
              <h4 className="text-denger"> loading... </h4>
            ) : (
              <h4 className="text-blue-900 text-4xl p-3">Login</h4>
            )}
            <ToastContainer />
            {LoginForm()}
            <Button
              onClick={googleLogin}
              type="danger"
              className="mb-3 bg-red-600 hover:bg-slate-600 hover:text-black hover:text-lg cursor-pointer"
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
            >
              Login with google
            </Button>
            <div className="hover:text-lg hover:text-blue-600 bg-slate-500">
              <Link
                to="/forgot/password"
                className="float-right text-danger hover:text-blue-500"
              >
                {" "}
                forgot password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
