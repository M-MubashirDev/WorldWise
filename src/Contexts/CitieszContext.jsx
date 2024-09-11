import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const initial = {
  isloading: false,
  passObj: [],
  currentCity: {},
  errorMessage: "",
};
const citiesContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isloading: action.valueType };
    case "error":
      return { ...state, isloading: false };
    case "city/loaded":
      return { ...state, passObj: action.valueType, isloading: false };
    case "city/add":
      return {
        ...state,
        passObj: [...state.passObj, action.valueType],
        isloading: false,
      };
    case "city":
      return { ...state, currentCity: action.valueType, isloading: false };
    case "city/delete":
      console.log(
        {
          ...state,
          passObj: [
            ...state.passObj.filter((val) => val.id !== action.valueType),
          ],
        },
        "🔥🔥🔥🔥🔥🔥🔥🔥"
      );

      return {
        ...state,
        passObj: [
          ...state.passObj.filter((val) => val.id !== action.valueType),
        ],

        isloading: false,
      };
    default:
      throw new Error("Invalid action");
  }
}
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const link = "http://localhost:9000";
  console.log(state);
  useEffect(() => {
    async function fakeApi() {
      dispatch({ type: "loading", valueType: true });
      try {
        const resp = await fetch(`${link}/cities`);
        const data = await resp.json();

        dispatch({ type: "city/loaded", valueType: data });
      } catch {
        dispatch({
          type: "error",
          valueType: "There was error while loading data",
        });
      }
    }
    fakeApi();
  }, []);
  const CityListFun = useCallback(async function (id) {
    dispatch({ type: "loading", valueType: true });
    try {
      const resp = await fetch(`${link}/cities/${id}`);
      const data = await resp.json();

      dispatch({ type: "city", valueType: data });
    } catch {
      dispatch({
        type: "error",
        valueType: "there is issue to retrive data for the ity",
      });
    }
  }, []);
  async function AddCity(id) {
    dispatch({ type: "loading", valueType: true });
    try {
      await fetch(`${link}/cities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      });
      dispatch({ type: "city/add", valueType: id });
    } catch {
      dispatch({
        type: "error",
        valueType: "there is issue while adding city",
      });
    }
  }
  async function DeleteCity(id) {
    dispatch({ type: "loading", valueType: true });
    try {
      await fetch(`${link}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", valueType: id });
    } catch {
      dispatch({
        type: "error",
        valueType: "there was error while removing city",
      });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        passObj: state.passObj,
        isloading: state.isloading,
        currentCity: state.currentCity,
        CityListFun,
        AddCity,
        DeleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
function useCityHook() {
  const context = useContext(citiesContext);
  console.log(context, "pakis");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useCityHook, CitiesProvider };
