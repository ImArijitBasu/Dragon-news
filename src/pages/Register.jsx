import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser ,updateUserProfile} = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    if (name.length < 5) {
      setError({ ...error, name: "name must be long" });
      return;
    }
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    console.log({ name, email, photo, password });

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        updateUserProfile({displayName : name , photoURL : photo})
        .then(()=>{
          navigate("/")
        })
        .catch(error => console.log(error))
      })
      .catch((error) => console.log(error.code));
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card rounded-none bg-base-100 w-full max-w-lg shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center pt-4">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              name="name"
              required
            />
            {error.name && <label className="label text-xs text-rose-500">{error.name}</label>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Your Photo URL"
              className="input input-bordered"
              name="photo"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              name="password"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
        <p>
          Already have an account ?{" "}
          <Link className="text-blue-600 font-bold" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
