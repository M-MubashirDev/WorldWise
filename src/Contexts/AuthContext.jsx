import { createContext, useContext, useReducer } from "react";
// import { useNavigate } from "react-router-dom";
const initial = { user: "", isAuthe: false };
function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case "login":
      return { ...state, isAuthe: action.valueType, user: FAKE_USER };
    case "logout":
      return {
        ...state,
        isAuthe: action.valueType,
      };
    default:
      return;
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const Athcontext = createContext();

function AuthProvider({ children }) {
  const [{ isAuthe, user }, dispatch] = useReducer(reducer, initial);
  function Login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", valueType: true });
  }
  function Logout() {
    dispatch({ type: "logout" });
  }

  return (
    <Athcontext.Provider value={{ Login, Logout, isAuthe, user }}>
      {children}
    </Athcontext.Provider>
  );
}
function useAuthProvider() {
  const contexts = useContext(Athcontext);
  console.log(contexts);
  // if (!contexts) throw new Error("watch");
  return contexts;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useAuthProvider, AuthProvider };
