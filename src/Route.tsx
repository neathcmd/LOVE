import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Page/Home";
import DateCounter from "./Page/CounterDate";
import SentMessages from "./Page/SentMessage";
import OurStories from "./Page/OurStories";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter-date" element={<DateCounter />} />
      <Route path="/sent-messages" element={<SentMessages />} />
      <Route path="/stories" element={<OurStories />} />
    </Routes>
  );
};

export default AppRoute;
