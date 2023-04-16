import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import { Header } from "./header/header";
import { Main } from "./pages/main/main";
import { Cart } from "./pages/cart/cart";
import { useEffect, useRef } from "react";
import { layoutMaxWidth, layoutPading } from "./config";

export const paths = {
  home: "/",
  cart: "/cart"
} as const

function App() {
  const appRef = useRef<HTMLDivElement>(null!);

  return (
    <div
      ref={appRef}
      className='app'
      style={{
        padding: `0px ${layoutPading.horizontal}px ${layoutPading.vertical}`,
        maxWidth: `${layoutMaxWidth}px`,
      }} >
      <Header />
      <Routes>
        <Route path={paths.home} element={<Main />} />
        <Route path={paths.cart} element={<Cart />} />
      </Routes>
      <ScrollToTop />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App