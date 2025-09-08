import jsPDF from "jspdf";

/**
 * Generate Blood Donation Pledge Certificate PDF
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.state
 * @param {string} params.district
 * @param {string} params.date
 * @param {string} params.backgroundImgUrl - full-page certificate image
 */
export const generatePledgeCertificate = ({ name, state, district, date, backgroundImgUrl }) => {
  const doc = new jsPDF({ orientation: "landscape" });
  const pageWidth = doc.internal.pageSize.getWidth();

  const addText = () => {
    let y = 60; // starting vertical position

    // doc.setFontSize(22);
    // doc.setFont("helvetica", "bold");
    // doc.text("National Voluntary", pageWidth / 2, y, { align: "center" });

    // y += 12;
    // doc.setFontSize(28);
    // doc.setTextColor(220, 20, 60); // red color for Blood Donation
    // doc.text("Blood Donation Day,2025", pageWidth / 2, y, { align: "center" });

    y += 15;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    // Line 1: "I, <name>, a resident of..."
    const line1Start = "I, ";
    const line1Name = name;
    const line1End = `, a resident of ${district}, ${state} India, today, on 1st October 2025, National Voluntary Blood Donor Day, do hereby pledge to donate my blood regularly.`;

    // Measure and position each part to center
    const widthStart = doc.getTextWidth(line1Start);
    const widthName = doc.getTextWidth(line1Name);
    const widthEnd = doc.getTextWidth(line1End);

    let totalWidth = widthStart + widthName + widthEnd;
    let startX = (pageWidth - totalWidth) / 2;

    doc.text(line1Start, startX, y);
    startX += widthStart;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 20, 60); // red for name
    doc.text(line1Name, startX, y);
    startX += widthName;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(line1End, startX, y);

    y += 12;
    const lines = [
      "Keeping in view the need for blood in India. I also undertake to create awareness amongst my",
      "family members, friends, relatives, colleagues and the public about the need for regular,",
      "voluntary, unpaid blood donation.",
      "Along with this, I also undertake that whenever someone is in need of blood, I shall donate blood",
      "without any greed and without any discrimination.",
      "I will make relentless efforts so that no life is lost around us due to shortage of blood."
    ];

    lines.forEach((line) => {
      doc.text(line, pageWidth / 2, y, { align: "center" });
      y += 10;
    });

    // Date box
    y += 5;
    const dateText = `Pledge Date on: ${date}`;
    const rectWidth = doc.getTextWidth(dateText) + 10;
    const rectX = (pageWidth - rectWidth) / 2;
    doc.setFillColor(173, 216, 230); // light blue
    doc.roundedRect(rectX, y, rectWidth, 8, 2, 2, "F");
    doc.setTextColor(0, 0, 0);
    doc.text(dateText, pageWidth / 2, y + 6, { align: "center" });

    // Save PDF
    doc.save(`${name}_Pledge_Certificate.pdf`);
  };

  // Load background image
  if (backgroundImgUrl) {
    const img = new Image();
    img.src = backgroundImgUrl;

    img.onload = () => {
      doc.addImage(img, "PNG", 0, 0, pageWidth, doc.internal.pageSize.getHeight());
      addText();
    };
    img.onerror = () => {
      console.error("Background image failed to load. PDF will be generated without it.");
      addText();
    };
  } else {
    addText();
  }
};
