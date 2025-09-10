import jsPDF from "jspdf";

/**
 * @param {string} backgroundImgUrl - Path or URL of background image
 */
export const generatePledgeCertificate = ({
  name,
  state,
  district,
  date,
  backgroundImgUrl,
}) => {
  const doc = new jsPDF({ orientation: "landscape" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // 🔹 Add background image first
  if (backgroundImgUrl) {
    const img = new Image();
    img.src = backgroundImgUrl;

    img.onload = () => {
      doc.addImage(
        img,
        "JPEG",
        0,
        0,
        pageWidth,
        doc.internal.pageSize.getHeight()
      );
      addText(doc);
    };

    img.onerror = () => {
      console.error(
        "Background image failed to load. PDF will be generated without it."
      );
      addText(doc);
    };
  } else {
    addText(doc);
  }

  const addText = (doc) => {
    const paragraphs = [
      [
        `I, ${name}, a resident of ${district}, ${state}, today, on 1st October`,
        `2025, National Voluntary Blood Donor Day, do hereby pledge to donate my blood regularly.`,
      ],
      [
        `Keeping in view the need for blood in India, I also undertake to create awareness amongst my`,
        `family members, friends, relatives, colleagues and the public about the need for regular,`,
        `voluntary, unpaid blood donation.`,
      ],
      [
        `Along with this, I also undertake that whenever someone is in need of blood, I shall donate blood`,
        `without any greed and without any discrimination.`,
      ],
      [
        `I will make relentless efforts so that no life is lost around us due to shortage of blood.`,
      ],
    ];

    doc.setFontSize(12);
    let y = 75;
    const lineSpacing = 6;
    const paragraphSpacing = 14;

    // Render normal paragraphs
    paragraphs.forEach((para, idx) => {
      para.forEach((line) => {
        if (
          line.includes(name) ||
          line.includes(district) ||
          line.includes(state)
        ) {
          // Highlight placeholders
          let highlighted = line
            .replace(name, `[[RED]]${name}[[/RED]]`)
            .replace(district, `[[BOLD]]${district}[[/BOLD]]`)
            .replace(state, `[[BOLD]]${state}[[/BOLD]]`);

          const parts = highlighted.split(/(\[\[.*?\]\])/);
          let x = pageWidth / 2 - doc.getTextWidth(line) / 2;

          parts.forEach((part) => {
            if (part === "[[RED]]") {
              doc.setTextColor(200, 0, 0);
              doc.setFont("helvetica", "normal");
            } else if (part === "[[/RED]]") {
              doc.setTextColor(0, 0, 0);
              doc.setFont("helvetica", "normal");
            } else if (part === "[[BOLD]]") {
              doc.setTextColor(0, 0, 0);
              doc.setFont("helvetica", "bold");
            } else if (part === "[[/BOLD]]") {
              doc.setTextColor(0, 0, 0);
              doc.setFont("helvetica", "normal");
            } else if (part.trim() !== "") {
              doc.text(part, x, y);
              x += doc.getTextWidth(part);
            }
          });
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "normal");
          doc.text(line, pageWidth / 2, y, { align: "center" });
        }
        y += lineSpacing;
      });

      if (idx < paragraphs.length - 1) {
        y += paragraphSpacing - lineSpacing;
      }
    });

    // 🔹 Draw pledge date with background
    const pledgeText = `Pledge Date on: ${date}`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const textWidth = doc.getTextWidth(pledgeText);
    const paddingX = 6;
    const paddingY = 1;

    const rectX = pageWidth / 2 - (textWidth + paddingX * 2) / 2;
    const rectY = y; // position below last paragraph
    const rectW = textWidth + paddingX * 2;
    const rectH = 12;

    // Background rounded rectangle
    doc.setFillColor(173, 216, 230); // light blue
    doc.roundedRect(rectX, rectY, rectW, rectH, 5, 5, "F");

    // Center text inside rectangle
    doc.setTextColor(0, 0, 0);
    doc.text(pledgeText, pageWidth / 2, rectY + rectH / 2 + 3, {
      align: "center",
    });

    doc.save(`${name}_Pledge_Certificate.pdf`);
  };
};
