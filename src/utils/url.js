		  const currentUrl = window.location.href;
  console.log("Current URL:", currentUrl);
  
  const urlObject = new URL(currentUrl);
  const dynamicBaseURL = urlObject.port
    ? `${urlObject.protocol}//${urlObject.hostname}:${urlObject.port}`
    : `${urlObject.protocol}//${urlObject.hostname}`;
  
  // export const BaseUrl = 'http://10.226.25.103:8080';
  export const BaseUrl = 'http://10.226.30.41:8080';

  // export const BaseUrl = dynamicBaseURL;
  
  console.log("Dynamic Base URL:", BaseUrl);