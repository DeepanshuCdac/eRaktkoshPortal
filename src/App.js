import "./App.css";
import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
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
import ERaktkosh_login from "./pages/eRaktkosh_login";
import DonorLogin from "./pages/donorLogin.js";
import DonorRegister from "./pages/donorRegister.js";
import DonorAdmin from "./pages/donorAdmin";

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar />

        <Switch>
          {/* Grouped all "pages" routes under a single route */}
          <Route path="/pages">
            <Switch>
              <Route path="/pages/portalDonorLogin">
                <DonorLogin />
              </Route>

              <Route path="/pages/portaldonorRegister">
                <DonorRegister />
              </Route>

              <Route path="/pages/portaldonorAdmin">
                <DonorAdmin />
              </Route>

              {/* Add more routes inside /pages as needed */}
            </Switch>
          </Route>

          {/* Main routes */}
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
      </HashRouter>
    </div>
  );
}

export default App;
