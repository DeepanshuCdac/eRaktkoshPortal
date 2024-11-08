import "./App.css";
import React from "react";
import { HashRouter, Switch, Route, useLocation } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <DonorProvider>
          <AppContent />
        </DonorProvider>
      </HashRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar only on the specific admin page */}
      {location.pathname !== '/pages/portaldonorAdmin' && <Navbar />}

      <Switch>
        {/* Donor portal routes */}
        <Route path="/pages/portalDonorLogin">
          <DonorLogin />
        </Route>

        <Route path="/pages/portaldonorRegister">
          <DonorRegister />
        </Route>

        <Route path="/pages/portaldonorAdmin">
          <DonorAdmin />
        </Route>

        {/* Main landing page routes */}
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
