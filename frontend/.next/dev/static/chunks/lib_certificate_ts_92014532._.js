(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/certificate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateCertificate",
    ()=>generateCertificate,
    "generateUniqueId",
    ()=>generateUniqueId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/browser.js [app-client] (ecmascript)");
;
;
const generateCertificate = async (studentName, programName, date, venue, uniqueId)=>{
    const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
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
    pdf.text('CERTIFICATE OF COMPLETION', 148.5, 50, {
        align: 'center'
    });
    // Subtitle
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This is to certify that', 148.5, 70, {
        align: 'center'
    });
    // Student name
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text(studentName, 148.5, 90, {
        align: 'center'
    });
    // Program details
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('has successfully completed the program', 148.5, 110, {
        align: 'center'
    });
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(programName, 148.5, 130, {
        align: 'center'
    });
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Date: ${new Date(date).toLocaleDateString()}`, 148.5, 150, {
        align: 'center'
    });
    pdf.text(`Venue: ${venue}`, 148.5, 165, {
        align: 'center'
    });
    // Generate QR code
    try {
        const qrCodeDataUrl = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toDataURL(`Certificate ID: ${uniqueId}`);
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
const generateUniqueId = ()=>{
    return 'RC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_certificate_ts_92014532._.js.map