import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/authSlice";

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-4 min-h-screen">
      <h1 className="text-xl font-semibold">Sign Up</h1>
      <form
        action=""
        className="flex flex-col border-2 border-black py-10 px-6 bg-slate-200 rounded-md gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(register({ phone: userName, password })).then(() => {
            navigate("/");
          });
        }}
      >
        <input
          type="text"
          placeholder="user name"
          value={userName}
          className="rounded-md py-2 px-8 border border-black"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          className="rounded-md py-2 px-8 border border-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="rounded-md py-2 px-8 bg-green-500">
          Submit
        </button>
      </form>
    </div>
  );
}
