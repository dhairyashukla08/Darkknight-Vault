import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import "./SignUpSignIn.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { validateEmail,validatePassword } from "../Utils/validators";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  // function signUpWithEmail() {
  //   setLoading(true);
  //   if (name != "" && email != "" && password != "" && confirmPassword != "") {
  //     if (password === confirmPassword) {
  //       createUserWithEmailAndPassword(auth, email, password)
  //         .then((userCredential) => {
  //           const user = userCredential.user;
  //           console.log(user);
  //           toast.success("User Created Successfully!!");
  //           setLoading(false);
  //           setName("");
  //           setConfirmPassword("");
  //           setEmail("");
  //           setPassword("");
  //           createDoc(user);
  //           navigate("/dashboard");
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           toast.error(errorMessage);
  //           setLoading(false);
  //         });
  //     } else {
  //       toast.error("Password and Confirm Password does not match ");
  //       setLoading(false);
  //     }
  //   } else {
  //     toast.error("All Fields Are Mandatory");
  //     setLoading(false);
  //   }
  // }

  function signUpWithEmail() {
    setLoading(true);
    
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      toast.error("All Fields Are Mandatory");
      setLoading(false);
      return;
    }
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }
    
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      toast.error("Password must be at least 8 characters with uppercase, lowercase, and number");
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      setLoading(false);
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("User Created Successfully!!");
        setLoading(false);
        setName("");
        setConfirmPassword("");
        setEmail("");
        setPassword("");
        createDoc(user);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  }

  // function loginUsingEmail() {
  //   setLoading(true);
  //   if (email != "" && password != "") {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         toast.success("User Logged in!!");
  //         console.log("user logged in ", user);
  //         setLoading(false);
  //         navigate("/dashboard");
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         setLoading(false);
  //         toast.error(errorMessage);
  //       });
  //   } else {
  //     toast.error("All Fields Are Mandatory");
  //     setLoading(false);
  //   }
  // }

  function loginUsingEmail() {
    setLoading(true);
    if (email === "" || password === "") {
      toast.error("All Fields Are Mandatory");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User Logged in!!");
        console.log("user logged in ", user);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage);
      });
  }

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // toast.error("Doc Already Present");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log("user>>>",user);
        createDoc(user);
        setLoading(false);
        navigate("/dashboard");
        toast.success("User Authenticated");

      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      
      });

    }catch(e){
      setLoading(false);
      toast.error(e.message);
    }
    
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <form>
            <h2 className="title">
              Sign Up on <span className="blue-span">Darkknight Vault</span>
            </h2>

            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <Input
              label={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              blue={true}
              onClick={loginUsingEmail}
            />

            <p className="or-text">or</p>

            <Button
              text={loading ? "Loading..." : "Login with Google"}
              onClick={googleAuth}
            />
            <p
              className="or-text"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              or Don't have an Account ? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <form>
            <h2 className="title">
              Sign Up on <span className="blue-span">Darkknight Vault</span>
            </h2>

            <Input
              type="text"
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <Input
              label={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              label={"Confirm Password"}
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign up Using Email and Password"}
              blue={true}
              onClick={signUpWithEmail}
            />

            <p className="or-text">or</p>

            <Button
             text={loading ? "Loading..." : "Sign up with Google"}
            onClick={googleAuth} />
            <p
              className="or-text"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              or have an Account Already ? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpSignIn;
