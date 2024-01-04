import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleDownloadPdf = async (printRef) => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
};
