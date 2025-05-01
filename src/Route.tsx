import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Page/Home";
import DateCounter from "./Page/CounterDate";
import SentMessages from "./Page/SentMessage";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter-date" element={<DateCounter />} />
      <Route path="/sent-messages" element={<SentMessages />} />
    </Routes>
  );
};

export default AppRoute;
