import { Route, Routes } from "react-router-dom";

// Replica build. The previous design lives on in ./pages/Home — swap the
// "/" route back to it to roll this out in one line.
import Home from "./pages/HomeReplica";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FormSuccess from "./pages/FormSuccess";
import Discovery from "./pages/Discovery";
import CaptureMockup from "./pages/CaptureMockup";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";

import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminContactDetails from "./pages/admin/AdminContactDetails";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";

function App() {
  return (
    <>
      <AnalyticsTracker />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/discovery" element={<Discovery />} />

        {/* Dev-only surface for recording showcase videos. Not built in prod. */}
        {import.meta.env.DEV && (
          <Route path="/__capture/:id" element={<CaptureMockup />} />
        )}

        <Route path="/succes" element={<FormSuccess />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/politica-confidentialitate" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/terms" element={<Terms />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;