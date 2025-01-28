
// const getSSOTicketVar = () => {
//     console.log("Extracting SSO Ticket:");
//     const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
//     const varSSOTicketGrantingTicket = urlParams.get('varSSOTicketGrantingTicket');
  
//     if (varSSOTicketGrantingTicket) {
//       const currentTicket = sessionStorage.getItem("grantingTcn");
  
//       if (currentTicket !== varSSOTicketGrantingTicket) {
//         console.log("Updating session storage with new SSO Ticket:", varSSOTicketGrantingTicket);
//         sessionStorage.setItem("grantingTcn", varSSOTicketGrantingTicket);
//       }
//     } else {
//       console.log("No SSO ticket found in the URL.");
//     }
//   };
  
//   getSSOTicketVar();
  
//   const getUserAgent = () => {
//     return navigator.userAgent;
//   };
  
  const currentUrl = window.location.href;
  console.log("Current URL:", currentUrl);
  
  const urlObject = new URL(currentUrl);
  const dynamicBaseURL = urlObject.port
    ? `${urlObject.protocol}//${urlObject.hostname}:${urlObject.port}`
    : `${urlObject.protocol}//${urlObject.hostname}`;
  
//   export const BaseUrl = 'http://10.226.30.41:8085';

  export const BaseUrl = dynamicBaseURL;
  
  console.log("Dynamic Base URL:", BaseUrl);