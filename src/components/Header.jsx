import React from "react";
import "./Header.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logoutFnc = () => {
    try {
      signOut(auth)
        .then(() => {
            toast.success("Logged Out from Darkknight Vault!!");
            navigate("/")
        })
        .catch((error) => {
toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <nav className="navbar">
      <p className="logo">Darkknight Vault</p>
      {user && (
        <p className="link" onClick={logoutFnc}>
          Logout
        </p>
      )}
    </nav>
  );
};

export default Header;
