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

  const pageWidth = 297;
  const pageHeight = 210;

  // Set background color to cream/off-white
  pdf.setFillColor(255, 253, 245);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Draw decorative golden border (outer)
  pdf.setDrawColor(184, 134, 11); // Dark golden
  pdf.setLineWidth(3);
  pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

  // Draw decorative golden border (inner)
  pdf.setDrawColor(218, 165, 32); // Golden
  pdf.setLineWidth(1.5);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Draw decorative pattern border
  pdf.setDrawColor(184, 134, 11);
  pdf.setLineWidth(0.5);
  for (let i = 0; i < pageWidth - 30; i += 4) {
    pdf.line(15 + i, 15, 17 + i, 15);
    pdf.line(15 + i, pageHeight - 15, 17 + i, pageHeight - 15);
  }
  for (let i = 0; i < pageHeight - 30; i += 4) {
    pdf.line(15, 15 + i, 15, 17 + i);
    pdf.line(pageWidth - 15, 15 + i, pageWidth - 15, 17 + i);
  }

  // Organization name at top
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Radial Code Programs', pageWidth / 2, 35, { align: 'center' });

  // Subtitle
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text('(Professional Development & Training Programs)', pageWidth / 2, 43, { align: 'center' });

  // Certificate of Participation banner
  drawBlueBanner(pdf, pageWidth / 2 - 55, 50, 110, 14);
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Certificate of Participation', pageWidth / 2, 59, { align: 'center' });

  // Certificate number and Registration ID
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Cert.No.`, 25, 75);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${uniqueId}`, 45, 75);

  // QR Code on right side
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(`https://verify.radialcode.com/cert/${uniqueId}`, {
      width: 200,
      margin: 1
    });
    pdf.addImage(qrCodeDataUrl, 'PNG', pageWidth - 55, 68, 28, 28);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }

  pdf.setFont('helvetica', 'normal');
  pdf.text(`Regd Id : ${uniqueId.substring(0, 10)}`, pageWidth - 55, 100);

  // Main certificate text
  const startY = 115;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  // "This is to certify that Mr./Ms./Mrs."
  pdf.text('This is to certify that Mr./Ms./Mrs.', 25, startY);
  
  // Student name with underline
  pdf.setFont('helvetica', 'bold');
  const nameX = 95;
  pdf.text(studentName, nameX, startY);
  const nameWidth = pdf.getTextWidth(studentName);
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.3);
  pdf.line(nameX, startY + 1, nameX + Math.max(nameWidth, 80), startY + 1);

  // "of" line with college/venue
  pdf.setFont('helvetica', 'normal');
  pdf.text('of', 25, startY + 12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(venue, 35, startY + 12);
  const venueWidth = pdf.getTextWidth(venue);
  pdf.line(35, startY + 13, 35 + Math.max(venueWidth, 120), startY + 13);
  pdf.setFont('helvetica', 'normal');
  pdf.text('has successfully', pageWidth - 60, startY + 12);

  // "participated in Online Training Program on"
  pdf.text('participated in Training Program on', 25, startY + 24);
  pdf.setFont('helvetica', 'bold');
  
  // Program name (may need to wrap if too long)
  const programNameX = 95;
  const maxProgramWidth = 160;
  if (pdf.getTextWidth(programName) > maxProgramWidth) {
    pdf.setFontSize(10);
  }
  pdf.text(programName, programNameX, startY + 24);
  const progWidth = pdf.getTextWidth(programName);
  pdf.line(programNameX, startY + 25, programNameX + Math.max(progWidth, 100), startY + 25);
  pdf.setFontSize(12);

  // "held on" with date
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('held on', 25, startY + 36);
  pdf.setFont('helvetica', 'bold');
  pdf.text(formattedDate, 45, startY + 36);
  pdf.line(45, startY + 37, 85, startY + 37);

  // Signature lines at bottom
  const sigY = pageHeight - 35;
  
  // Left signature
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setLineWidth(0.3);
  pdf.line(25, sigY, 85, sigY);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Program Director', 25, sigY + 5);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Radial Code Programs', 25, sigY + 10);

  // Right signature
  pdf.line(pageWidth - 85, sigY, pageWidth - 25, sigY);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Managing Director', pageWidth - 85, sigY + 5);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Radial Code Programs', pageWidth - 85, sigY + 10);

  return pdf.output('blob');
};

// Helper function to draw blue ribbon/banner
function drawBlueBanner(pdf: jsPDF, x: number, y: number, width: number, height: number) {
  // Main banner
  pdf.setFillColor(30, 100, 180);
  pdf.rect(x, y, width, height, 'F');
  
  // Left ribbon tail
  pdf.setFillColor(20, 70, 140);
  pdf.triangle(x, y, x - 8, y + height / 2, x, y + height, 'F');
  
  // Right ribbon tail
  pdf.triangle(x + width, y, x + width + 8, y + height / 2, x + width, y + height, 'F');
  
  // Gradient effect (darker bottom)
  pdf.setFillColor(20, 80, 160);
  pdf.rect(x, y + height - 3, width, 3, 'F');
}

export const generateUniqueId = (): string => {
  return 'RC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
};