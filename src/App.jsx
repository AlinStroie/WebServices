import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";
import FormSuccess from "./pages/FormSuccess";
import AnalyticsTracker from "./components/AnalyticsTracker";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function App() {
  return (
    <>
      <AnalyticsTracker />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/succes" element={<FormSuccess />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/politica-confidentialitate" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
