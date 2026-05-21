import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";
import FormSuccess from "./pages/FormSuccess";
import AnalyticsTracker from "./components/AnalyticsTracker";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminContactDetails from "./pages/admin/AdminContactDetails";


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
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<AdminBlogEditor />} />
          <Route path="blog/:id/edit" element={<AdminBlogEditor />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="contacts/:id" element={<AdminContactDetails />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
