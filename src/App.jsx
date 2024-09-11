import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
// import Home from "./pages/Home";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CitieszContext";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import SpinnerFullPage from "./components/SpinnerFullPage";
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
// const CityList = lazy(() => import("./pages/CityList"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <div>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="product" element={<Product />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="login" element={<Login />} />
                  <Route
                    path="layout"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="cities/:id" element={<City />} />
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="country" element={<CountryList />} />
                    <Route path="form" element={<Form />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </div>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
