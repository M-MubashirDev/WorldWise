import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuthProvider } from "../Contexts/AuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { Login, isAuthe } = useAuthProvider();
  function logFun(e) {
    e.preventDefault();
    Login(email, password);
  }
  useEffect(
    function () {
      if (isAuthe) navigate("/layout", { replace: true });
    },
    [isAuthe, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={logFun}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button Goto="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
