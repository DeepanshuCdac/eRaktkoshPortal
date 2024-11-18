import React, { useState } from 'react';
import { useCertificate } from '../context/CertificateContext';

export default function DonorAdminHome({onViewAllClick}) {
  const { certificateData, loading, error } = useCertificate();

  // Check if the certificateData is an array and contains data
  const isDataValid = Array.isArray(certificateData) && certificateData.length > 0;

  function abbreviateText(text) {
    const maxLength = 24;

    // if the text is in limit return same
    if (text.length <= maxLength) {
      return text;
    }
    // else truncate and add ellipsis
    return `${text.slice(0, maxLength - 3)}...`;
  }

  const handleDownloadClick = (certificateData) => {
    // Create a new window
    const newWindow = window.open("", "_blank", "width=1000,height=700");

    // Generate the certificate content
    const certificateContent = `
        <html>
          <head>
            <title>Donation Certificate</title>
            <link href="http://fonts.cdnfonts.com/css/aleo-2" rel="stylesheet" />
            <style>
              #t1 { border-collapse: collapse; }
              .tr { border: solid; border-width: 0px 0; height: 6%; }
              @media print { .noprint { display: none; } }
              @page { size: auto; margin: 0; }
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
                font-size: 13px;
              }
              @page { size: A4 landscape; }
              /* Center the content on the screen */
              .certificate-container {
                border: 3px solid #A47D00;
                padding: 10px;
              }
            </style>
          </head>
          <body>

          <div style="margin: 0 auto;  width: 800px;">  
          <div class="" style = "margin-bottom: 6px; display: flex; align-items: center; justify-content: end;">
          <button class="noprint" onClick="window.print()">Save</button>
          </div>
            <div class="certificate-container">
              <br>
              <br>
              <br>
                <table style="width: 100%; margin-top: -50px;">
                  <tbody>
                    <tr class="tr" style="display: grid; grid-template-columns: 150px 500px 100px;">
                      <td align="left" style="grid-column:1">
                        <img src="assets/images/mohfw-gov.png" width="150px" alt="MOHFW" />
                      </td>
                      <td align="left" style="grid-column:2">
                        <img src="assets/images/certificate-header.png" width="500px" alt="Header" />
                      </td>
                      <td align="left" style="grid-column:3">
                        <img src="assets/images/certificate-state.png" width="100px" height="100px" alt="State Logo" />
                      </td>
                    </tr>
                    <tr class="tr">
                      <td align="center" colspan="3">
                        <strong>Proudly Presented To</strong>
                      </td>
                    </tr>
                    <tr class="tr certificate-name">
                      <td align="center" colspan="3">
                        ${certificateData.username || 'N|A'}
                      </td>
                    </tr>
                    <tr class="tr">
                      <td align="center" colspan="3">
                        <b>in camp organized by</b>
                      </td>
                    </tr>
                    <tr class="tr">
                      <td align="center" colspan="3">
                        with <b>${certificateData.bloodbank || 'N|A'}, ${certificateData.districtName || 'N|A'}, ${certificateData.stateName || 'N|A'}</b>
                      </td>
                    </tr>
                    <tr class="tr">
                      <td align="center" colspan="3">
                        <br />
                        On <b>${certificateData.date || 'N/A'}</b> for this benevolent gesture of donating blood which helped in saving precious human life.
                      </td>
                    </tr>
                    <tr class="tr">
                      <td align="center" colspan="3" style="width: 100%;">
                        <br />
                        We compliment you and thank you on the behalf of ${certificateData.bloodbank || 'N|A'} for this noble deed, which we are sure will be emulated by many other public-spirited persons like you.
                      </td>
                    </tr>
                    <tr style="font-size: 15px;">
                      <td align="left" colspan="2" style="width: 40%;">
                        <br /><br />
                        <b>Donor No:&nbsp; </b>${certificateData.bagNo || 'N|A'}
                      </td>
                      <td></td>
                    </tr>
                    <tr style="font-size: 15px;">
                      <td align="left" style="width: 60%;">
                        <b>Blood Group:</b>&nbsp;${certificateData.bloodGroupName || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td align="center" colspan="3" style="width: 100%;">
                        <img src="assets/images/certificate-footer.png" width="320px" alt="Footer" />
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            </div>
          </body>
        </html>
      `;


    // Write the content to the new window
    newWindow.document.write(certificateContent);

    // Close the document to apply styles
    newWindow.document.close();
  };


  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="tabContent mb-3">
            <div className="tabContainer">
              <div className="widget-abha d-flex justify-content-between px-4 pt-4">
                <div>
                  <h4 className="widgeHeader mb-2">Generate/Verify ABHA</h4>
                  <button className="btn abha-btn">Download / Verify ABHA</button>
                </div>
                <img src="assets/images/abha-img.png" alt="Abha-img" />
              </div>

              {/* Donor Certificate Section */}
              <div className='d-flex mb-0 w-100'>
                <h4 className="widgeHeader mb-0 me-auto">Donor Certificate</h4>
                <button onClick={onViewAllClick} className="btn btn-link px-0 py-1">
                  View All
                </button>
              </div>
              <div className="widget p-4">
                {loading && <div>Loading certificate data...</div>}
                {error && <div className="text-danger">Error loading certificate data: {error}</div>}
                {!loading && !error && isDataValid ? (
                  <div className="row">
                    {/* Loop through certificateData array */}
                    {certificateData.map((item, index) => (
                      <div key={index} className="col-xl-4 mb-2">
                        <div className='d-flex align-items-start'>
                          <img style={{ height: '30px' }} src="assets/images/pdf.png" alt="Pdf" />
                          <div style={{ marginLeft: '12px' }}>
                            <p className="mb-0 widgeText">{abbreviateText(item.bloodbank || 'Unknown Hospital')}</p>
                            <p className="mb-0 donationTxt">
                              Donation Date: <span className='mb-0 donation-date'>{item.date || 'N/A'}</span>
                            </p>
                            <button
                              className="btn btn-link p-0"
                              onClick={() => handleDownloadClick(item)}
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !loading && !error && <div>No donation records found.</div>
                )}
              </div>

              {/* Previous Donations Section */}
              <h4 className="widgeHeader mb-2">Previous Donations</h4>
              <div className="widget p-4">
                {loading && <div>Loading previous donation data...</div>}
                {error && <div className="text-danger">Error loading previous donations: {error}</div>}
                {!loading && !error && isDataValid ? (
                  <div className="row">
                    {/* show only last three donation records.. */}
                    {certificateData.slice(0, 3).map((item, index) => (
                      <div key={index} className='col-xl-4'>
                        <div className='d-flex align-items-start'>
                          <img className='img-fluid' style={{ height: '27px' }} src="assets/images/hospital.png" alt="Hospital" />
                          <div style={{ marginLeft: '12px' }}>
                            <p className='mb-0 widgeText'>{abbreviateText(item.bloodbank || 'Unknown Hospital')}</p>
                            <p className='mb-0 donationTxt'>
                              Donation Date: <span className='mb-0 donation-date'>{item.date || 'N/A'}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !loading && !error && <div>No previous donations found.</div>
                )}
              </div>

              {/* In News Section */}
              <h4 className="widgeHeader mb-2">In News</h4>
              <div className="row">
                {["View", "Download PDF", "View"].map((action, index) => (
                  <div key={index} className="col-xl-4">
                    <div className="widget p-4">
                      <div>
                        <p className='mb-1 widgeText'>Grant of Special Casual Leave for the purpose of blood donation</p>
                        <p className='mb-1 newsTxt'>
                          It has now been decided that Special Casual leave may be granted for blood donation or for apheresis (blood components such as red cells, plasma, platelets etc.) donation at licensed blood banks on a working day (for that day only) up to a maximum of four times in a year on submission of valid proof of donation.
                        </p>
                        <a href="javascript:void(0)">{action}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
