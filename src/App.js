import "./App.css";
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "../src/landingPage/navbar.js";
import Service from "../src/landingPage/service.js";
import Donationworking from "../src/landingPage/donationWorking.js";
import Footer from "../src/landingPage/footer.js";
import HeroComponent from "./landingPage/heroComponent.js";
import DonorLogin from "./pages/donorLogin.js";
import DonorRegister from "./pages/donorRegister.js";
import DonorAdmin from "./pages/donorAdmin";
import { DonorProvider } from "./context/DonorContext.js";
import { CertificateProvider } from "./context/CertificateContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import BloodAvailabiltySearch from "./publicPages/bloodAvailabilitySearch.js";
import CampSchedule from "./publicPages/CampSchedule.js";
import BloodBankDirectory from "./publicPages/BloodBankDirectory.js";
import DonationPledge from "./publicPages/DonationPledge.js";
import CampRegistration from "./publicPages/CampRegistration.js";
import Faqs from "./publicPages/Faqs.js";
import Notification from "./publicPages/Notification.js";
import AboutEraktkosh from "./publicPages/AboutEraktkosh.js";
// import Gallery from "./publicPages/gallery.js";
import GalleryCarousel from "./publicPages/GalleryCarousol.jsx";
import DonorCampRegister from "./publicPages/donorCampRegister.js";
import { CampProvider } from "./context/CampContext.js";
import { initGA, logPageView } from "./utils/ga.js";
import BodyMan from "./landingPage/bodyMan.js";
import ScrollToTop from "./landingPage/scrollToTop.js";
import Link from "./landingPage/link.js";
import IndiaMap from "./landingPage/indiaMap.js";
import FooterCarousel from "./landingPage/footerCarousel.js";
import Counter from "./testing/counter.jsx";
import Card from "./testing/card.jsx";
import Todo from "./testing/todo.jsx";
import Stories from "./landingPage/stories.js";
import ColorPicker from "./testing/colorPicker.jsx";

// const MEASUREMENT_ID = "G-SBWWZLM7W6"
// ReactGA.initialize(MEASUREMENT_ID)

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <DonorProvider>
          <CertificateProvider>
            <CampProvider>
              <AppContent />
            </CampProvider>
          </CertificateProvider>
        </DonorProvider>
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  const hideNavbarPaths = ["/pages/portaldonorAdmin"];
  const hideFooterPaths = [
    "/pages/portalDonorLogin",
    "/pages/portaldonorAdmin",
  ];

  return (
    <>
      {/* {location.pathname !== '/pages/portaldonorAdmin' && <Navbar />} */}

      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Switch>
        <Route path="/publicPages/Notification">
          <Notification />
        </Route>

        <Route path="/publicPages/FAQs">
          <Faqs />
        </Route>

        <Route path="/publicPages/AboutEraktkosh">
          <AboutEraktkosh />
        </Route>

        <Route path="/publicPages/gallery">
          <GalleryCarousel />
        </Route>

        <Route path="/publicPages/bloodAvailabilitySearch">
          <BloodAvailabiltySearch useContainer={true} />
        </Route>

        <Route path="/publicPages/bloodBankDirectory">
          <BloodBankDirectory />
        </Route>

        <Route path="/publicPages/campSchedule">
          <CampSchedule />
        </Route>

        <Route path="/publicPages/donorCampRegister">
          <DonorCampRegister />
        </Route>

        <Route path="/publicPages/campRegistration">
          <CampRegistration />
        </Route>

        <Route path="/publicPages/donationPledge">
          <DonationPledge />
        </Route>

        <Route path="/pages/portalDonorLogin">
          <DonorLogin />
        </Route>

        <Route path="/pages/portaldonorRegister">
          <DonorRegister />
        </Route>

        <Route path="/pages/portaldonorAdmin">
          <ProtectedRoute>
            <DonorAdmin />
          </ProtectedRoute>
        </Route>

        <Route path="/">
          <HeroComponent />
          <Link />
          <Service />
          <BodyMan />
          <Donationworking />
          <IndiaMap />
          {/* <Counter/> */}
          {/* <Card/> */}
          {/* <Todo/> */}
          {/* <ColorPicker/> */}
          <Stories/>
          <FooterCarousel />
          <ScrollToTop />
        </Route>
      </Switch>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
