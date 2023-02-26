const QrCode = require("qrcode");
const PDFDocument = require("pdfkit");

const generateListQr = async (res, listItems = [], filename = "qrcodes") => {
  const qrWidth = 300;
  const qrHeight = 300;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.pdf`);

  let jump = 0;

  for (const item of listItems) {
    if (jump % 2 === 0 && jump != 0) {
      doc.addPage();
    }

    doc.fontSize(18).text(item.title, { align: "center" });

    const qrCode = await QrCode.toBuffer(`${item.id}`, {
      width: qrWidth,
      heigth: qrHeight,
    });

    doc.image(qrCode, doc.page.width / 2 - qrWidth / 2, doc.y);

    jump++;
  }

  doc.pipe(res);
  doc.end();
};

const generateQr = async (res, item = {}, filename = "qrcodes") => {
  const qrWidth = 300;
  const qrHeight = 300;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.pdf`);

  doc.fontSize(18).text(item.title, { align: "center" });

  const qrCode = await QrCode.toBuffer(`${item.id}`, {
    width: qrWidth,
    height: qrHeight,
  });
  doc.image(qrCode, doc.page.width / 2 - qrWidth / 2, doc.y);

  doc.pipe(res);
  doc.end();
};

module.exports = {
  generateListQr,
  generateQr,
};
