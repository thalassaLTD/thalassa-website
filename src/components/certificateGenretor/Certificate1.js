import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import saveAs from "file-saver";
import pdf from "../certificateGenretor/certificate1.pdf";

async function modifyPdf(name, company, program, date, ref) {
  const existingPdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText(name, {
    x: 100,
    y: 300,
    size: 45,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(company, {
    x: 230,
    y: 253,
    size: 16,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(program, {
    x: 410,
    y: 278,
    size: 16,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(ref, {
    x: 725,
    y: 25,
    size: 16,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(date, {
    x: 210,
    y: 175,
    size: 16,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });

  const uri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(uri, "Certificate.pdf", { autoBom: true });
}

export default function generateCertificate(name, company, program, date, ref) {
  debugger
  if (name && company && program && date && ref !== "") {
    modifyPdf(name, company, program, date, ref);
  } else {
    alert("Enter Student Details");
  }
}
