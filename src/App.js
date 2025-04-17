import "./App.css";
import React from "react";
import { HashRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <DonorProvider>
          <CertificateProvider>
            <AppContent />
          </CertificateProvider>
        </DonorProvider>
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/pages/portaldonorAdmin' && <Navbar />}

      <Switch>
        <Route path="/publicPages/Notification">
          <Notification />
        </Route>

        <Route path="/publicPages/FAQs">
          <Faqs />
        </Route>

        <Route path="/publicPages/bloodAvailabilitySearch">
          <BloodAvailabiltySearch useContainer={true} />
        </Route>

        <Route path="/publicPages/bloodBankDirectory">
          <BloodBankDirectory />
        </Route>

        <Route path="/publicPages/campSchedule">
          <CampSchedule useContainer={true} />
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
          <DonorCount />
          <Service />
          <Aboutpage />
          <LearnDonation />
          <Donationworking />
          <DonationType />
          <Benefits />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
