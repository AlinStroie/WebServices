import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Replica build. The previous design lives on in ./pages/Home — swap the
// "/" route back to it to roll this out in one line.
//
// Home stays a static import — it's what "/" needs on first paint, and the
// HTML-level #initial-loader already covers its load. Every other route is
// lazy: without this, visiting "/" pulled in the JS for every other page
// too, including admin (recharts) and the dev-only capture tool — all
// eagerly bundled into the same chunk the homepage had to parse and
// execute before it could paint anything, which is what made the Hero feel
// slow to appear.
import Home from "./pages/HomeReplica";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FormSuccess = lazy(() => import("./pages/FormSuccess"));
const Discovery = lazy(() => import("./pages/Discovery"));
const Pricing = lazy(() => import("./pages/Pricing"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const CaptureMockup = lazy(() => import("./pages/CaptureMockup"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Terms = lazy(() => import("./pages/Terms"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"));
const AdminContactDetails = lazy(() =>
  import("./pages/admin/AdminContactDetails")
);
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));

import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";

function App() {
  return (
    <>
      <AnalyticsTracker />
      <ScrollToTop />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/discovery" element={<Discovery />} />
          <Route path="/preturi" element={<Pricing />} />
          <Route path="/studii-de-caz" element={<CaseStudies />} />
          <Route path="/studii-de-caz/:slug" element={<CaseStudyDetail />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />

          {/* Dev-only surface for recording showcase videos. Not built in prod. */}
          {import.meta.env.DEV && (
            <Route path="/__capture/:id" element={<CaptureMockup />} />
          )}

          <Route path="/succes" element={<FormSuccess />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
            path="/politica-confidentialitate"
            element={<PrivacyPolicy />}
          />
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
      </Suspense>
    </>
  );
}

export default App;