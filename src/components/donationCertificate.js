import React from "react";

const DonationCertificate = () => {
  const donorDetailVO = {
    donorFirstName: "John Doe",
    organizationName: "XYZ Foundation",
    hospitalName: "City Hospital",
    districtName: "District A",
    stateName: "State B",
    donationDate: "1st January 2024",
    bloodBagNo: "12345",
    bloodGroupName: "A+"
  };

  const handleSaveButton = () => {
    window.print();
  }

  return (
    <html dir="ltr" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="Content-Script-Type" content="text/javascript; charset=utf-8" />
        <link href="http://fonts.cdnfonts.com/css/aleo-2" rel="stylesheet" />
        <title>Conforming HTML 4.01 Strict Template</title>
        <style>
          {`
            #t1 {
              border-collapse: collapse;
            }
            .trr {
              border: solid;
              border-width: 0px 0;
              height: 6%;
            }
            @media print {
              .noprint {
                display: none;
              }
            }
            @page {
              size: auto;
              margin: 0;
            }
            .certificate-name td {
              font-family: 'Aleo', sans-serif !important;
              font-size: 46px !important;
              color: #A47D00 !important;
              font-weight: 700 !important;
              text-transform: uppercase !important;
            }
            table {
              border: none !important;
              font-family: 'Aleo', sans-serif;
              font-size: 18px;
            }
            @page {
              size: A4 landscape;
            }
          `}
        </style>
      </head>
      <body>

        <button onClick={handleSaveButton}>Save</button>
        <div id="onee1" style={{ width: "100%", height: "50%" }}>
          <div
            style={{
              width: "100%",
              float: "right",
              border: "3px solid",
              borderColor: "#A47D00",
              padding: "10px 10px",
            }}
          >
            <table style={{ width: "100%", marginTop: "-50px" }}>
              <tbody>
                <tr className="trr">
                  <td align="right" style={{ width: "20%" }}>
                    <img src="assets/images/mohfw-gov.png" width="180px" alt="MOHFW" />
                  </td>
                  <td align="right" style={{ width: "60%" }}>
                    <img src="assets/images/certificate-header.png" width="600px" alt="Header" />
                  </td>
                  <td align="left" style={{ width: "20%" }}>
                    <img src="assets/images/certificate-state.png" width="200px" height="100px" alt="State Logo" />
                  </td>
                </tr>
                <tr className="trr">
                  <td align="center" colSpan="3">
                    <strong>Proudly Presented To</strong>
                  </td>
                </tr>
                <tr className="trr certificate-name">
                  <td align="center" colSpan="3">
                    {donorDetailVO.donorFirstName}
                  </td>
                </tr>
                <tr className="trr">
                  <td align="center" colSpan="3">
                    <b>in camp organized by</b>
                  </td>
                </tr>
                <tr className="trr">
                  <td align="center" colSpan="3">
                    <b>{donorDetailVO.organizationName}</b>
                  </td>
                </tr>
                <tr className="trr">
                  <td align="center" colSpan="3">
                    with <b>{donorDetailVO.hospitalName}, {donorDetailVO.districtName}, {donorDetailVO.stateName}</b>
                  </td>
                </tr>
                <tr className="trr">
                  <td align="center" colSpan="3">
                    <br />
                    On <b>{donorDetailVO.donationDate}</b> for this benevolent gesture of donating blood which helped in saving precious human life.
                  </td>
                </tr>
                <tr className="trr">
                  <td align="center" colSpan="3" style={{ width: "100%" }}>
                    <br />
                    We compliment you and thank you on the behalf of {donorDetailVO.hospitalName} for this noble deed, which we are sure will be emulated by many other public-spirited persons like you.
                  </td>
                </tr>
                <tr style={{ fontSize: "18px" }}>
                  <td align="left" colSpan="2" style={{ width: "40%" }}>
                    <br />
                    <br />
                    <b>&nbsp;Donor No:&nbsp; </b>{donorDetailVO.bloodBagNo}
                  </td>
                  <td></td>
                </tr>
                <tr style={{ fontSize: "18px" }}>
                  <td align="left" style={{ width: "60%" }}>
                    <b>Blood Group:</b>&nbsp;{donorDetailVO.bloodGroupName}
                  </td>
                </tr>
                <tr>
                  <td align="center" colSpan="3" style={{ width: "100%" }}>
                    <img src="assets/images/certificate-footer.png" width="380px" alt="Footer" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  );
};

export default DonationCertificate;
