import styles from "./Button.module.css";
function Button({ children, onClick, Goto }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[Goto]}`}>
      {children}
    </button>
  );
}

export default Button;
