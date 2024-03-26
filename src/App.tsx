import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <div className="mx-10 h-[90%]">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
