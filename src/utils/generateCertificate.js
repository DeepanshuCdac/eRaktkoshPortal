// Donor Certificate Generated using Template...
export function generateCertificate(certificateData) {
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
            @media print { .noprint { display: none;  } }
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
              font-size: 14px;
            }
            @page { size: A4 landscape; }
            .certificate-container {
              border: 3px solid #A47D00;
              padding: 10px;
            }
          </style>
        </head>
        <body>
          <div style="margin: 0 auto; width: 800px;">
            <div class="" style="margin-bottom: 3px; display: flex; align-items: center; justify-content: end;">
              <button class="noprint" style=" padding: 2px 10px; font-size: 12px; font-weight: 600; background-color: #046EA3; border-radius: 5px; color: #fff; border: none; " onClick="window.print()">Save</button>
            </div>
            <div class="certificate-container">
            <br>
            <br>
            <br>
              <table style="width: 100%; margin-top: -50px;">
                <tbody>
                  <tr class="tr" style="display: grid; grid-template-columns: 150px 500px 100px;">
                    <td align="left"><img src="assets/images/mohfw-gov.png" width="150px" alt="MOHFW" /></td>
                    <td align="left"><img src="assets/images/certificate-header.png" width="500px" alt="Header" /></td>
                    <td align="left"><img src="assets/images/certificate-state.png" width="100px" height="100px" alt="State Logo" /></td>
                  </tr>
                  <tr class="tr"><td align="center" colspan="3"><strong>Proudly Presented To</strong></td></tr>
                  <tr class="tr certificate-name"><td align="center" colspan="3">${certificateData.username || 'N|A'}</td></tr>
                  <tr class="tr"><td align="center" colspan="3"><b>in camp organized by</b></td></tr>
                  <tr class="tr"><td align="center" colspan="3">with <b>${certificateData.bloodbank || 'N|A'}, ${certificateData.districtName || 'N|A'}, ${certificateData.stateName || 'N|A'}</b></td></tr>
                  <tr class="tr"><td align="center" colspan="3"> <br> On <b>${certificateData.date || 'N/A'}</b> for this benevolent gesture of donating blood which helped in saving precious human life.</td></tr>
                  <tr class="tr"><td align="left" colspan="3"> <br> We compliment you and thank you on the behalf of ${certificateData.bloodbank || 'N|A'} for this noble deed, which we are sure will </td></tr>
                   <tr class="tr"><td align="center" colspan="3">be emulated by many others public spirited person like you.</td></tr>
                  <tr style="font-size: 15px;"><td> <br> <br> <b>Donor No:&nbsp;</b>${certificateData.bagNo || 'N|A'}</td></tr>
                  <tr style="font-size: 15px;"><td><b>Blood Group:</b>&nbsp;${certificateData.bloodGroupName || 'N/A'}</td></tr>
                  <tr><td align="center" colspan="3"><img src="assets/images/certificate-footer.png" width="300px" alt="Footer" /></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    `;

    // Write the content to the new window
    newWindow.document.write(certificateContent);
    newWindow.document.close();
}
