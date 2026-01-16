import React from "react";
import "./Header.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import user1 from "./../assets/user1.svg";
import { useCurrency } from "../context/CurrencyContext";

const Header = () => {
  const { currency, setCurrency } = useCurrency();
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
          navigate("/");
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
        <div className="navbar-user">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <img
            src={user.photoURL ? user.photoURL : user1}
            className="user-image"
            alt="User Profile"
            onError={(e) => {
              e.target.src = user1;
            }}
          />
          <p className="link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </nav>
  );
};

export default Header;
