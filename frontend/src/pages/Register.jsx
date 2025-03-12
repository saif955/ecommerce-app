import { useRef, useState, useEffect, use } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  useEffect (() => {
    
      userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
    if (result) {
      setErrMsg("");
    } else {
      setErrMsg("Invalid Username");
    }
  }, [user]);
  
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match  = pwd === matchPwd;
    setValidMatch(match);
    if (result) {
      setErrMsg("");
    } else {
      setErrMsg("Invalid Password");
    }
    if (match) {
      setErrMsg("");
    } else {
      setErrMsg("Passwords do not match");
    }
  }, [pwd, matchPwd]);
  
  useEffect(() => {
    setErrMsg("");
  },[user, pwd, matchPwd]);

  return (
    <section className="register">
      
    </section>
  );
}

export default Register;
