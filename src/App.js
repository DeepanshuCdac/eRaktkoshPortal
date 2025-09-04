import "./App.css";
import React, {useEffect} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "../src/landingPage/navbar.js";
import Service from "../src/landingPage/service.js";
import Aboutpage from "../src/landingPage/aboutPage.js";
import Donationworking from "../src/landingPage/donationWorking.js";
import Footer from "../src/landingPage/footer.js";
import Benefits from "../src/landingPage/benefits.js";
import HeroComponent from "./landingPage/heroComponent.js";
import DonorCount from "./landingPage/donorCount";
import LearnDonation from "./landingPage/learnDonation";
import DonationType from "./landingPage/donationType";
import DonorLogin from "./pages/donorLogin.js";
import DonorRegister from "./pages/donorRegister.js";
import DonorAdmin from "./pages/donorAdmin";
import { DonorProvider } from "./context/DonorContext.js";
import { CertificateProvider } from "./context/CertificateContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import BloodAvailabiltySearch from "./publicPages/bloodAvailabilitySearch.js";
import CampSchedule from "./publicPages/CampSchedule.js";
import BloodBankDirectory from "./publicPages/BloodBankDirectory.js";
import CampRegistration from "./publicPages/CampRegistration.js";
import Faqs from "./publicPages/Faqs.js";
import Notification from "./publicPages/Notification.js";
import AboutEraktkosh from "./publicPages/AboutEraktkosh.js";
// import Gallery from "./publicPages/gallery.js";
import GalleryCarousel from "./publicPages/GalleryCarousol.jsx";
import DonorCampRegister from "./publicPages/donorCampRegister.js";
import { CampProvider } from "./context/CampContext.js";
import { initGA, logPageView } from './utils/ga.js';

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
    initGA(); // initialize once on load
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search); // log on route change
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
          {/* <DonorCount /> */}
          <Service />
          <Aboutpage />
          <LearnDonation />
          <Donationworking />
          <DonationType />
          <Benefits />
        </Route>
      </Switch>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
