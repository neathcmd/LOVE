import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Page/Home";
import DateCounter from "./Page/CounterDate";
import SentMessages from "./Page/SentMessage";
import OurStories from "./Page/OurStories";
import StoryEN from "./screen/StoriesEN";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter-date" element={<DateCounter />} />
      <Route path="/sent-messages" element={<SentMessages />} />
      <Route path="/stories" element={<OurStories />} />
      <Route path="/chapter/:id" element={<StoryEN />} />
    </Routes>
  );
};

export default AppRoute;
