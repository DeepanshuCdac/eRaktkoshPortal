import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-SBWWZLM7W6";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category, action, label = "") => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
