import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generateCertificate = async (
  studentName: string,
  programName: string,
  date: string,
  venue: string,
  uniqueId: string
): Promise<Blob> => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set background color to white
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 297, 210, 'F');

  // Add border
  pdf.setDrawColor(89, 40, 229); // Primary color
  pdf.setLineWidth(2);
  pdf.rect(10, 10, 277, 190);

  // Title
  pdf.setTextColor(89, 40, 229);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CERTIFICATE OF COMPLETION', 148.5, 50, { align: 'center' });

  // Subtitle
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text('This is to certify that', 148.5, 70, { align: 'center' });

  // Student name
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(studentName, 148.5, 90, { align: 'center' });

  // Program details
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text('has successfully completed the program', 148.5, 110, { align: 'center' });

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(programName, 148.5, 130, { align: 'center' });

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Date: ${new Date(date).toLocaleDateString()}`, 148.5, 150, { align: 'center' });
  pdf.text(`Venue: ${venue}`, 148.5, 165, { align: 'center' });

  // Generate QR code
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(`Certificate ID: ${uniqueId}`);
    pdf.addImage(qrCodeDataUrl, 'PNG', 250, 160, 30, 30);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }

  // Certificate ID
  pdf.setFontSize(10);
  pdf.text(`Certificate ID: ${uniqueId}`, 20, 190);

  // Radial Code branding
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Radial Code', 20, 30);

  return pdf.output('blob');
};

export const generateUniqueId = (): string => {
  return 'RC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
};