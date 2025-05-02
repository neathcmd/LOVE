import React from "react";
import Header from "./components/Header";
import AppRoute from "./Route";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./style/App.css";

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);
  return (
    <>
      <Header />
      <main>
        <AppRoute />
      </main>
      <Footer />
    </>
  );
};

export default App;
