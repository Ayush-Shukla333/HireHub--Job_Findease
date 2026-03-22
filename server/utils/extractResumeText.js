// server/utils/extractResumeText.js
import path from 'path';
import PDFParser from 'pdf2json';

export const extractTextFromPDF = async (filePath) => {
    return new Promise((resolve) => {
        try {
            const pdfParser = new PDFParser(null, 1);

            pdfParser.on('pdfParser_dataReady', () => {
                try {
                    const rawText = pdfParser.getRawTextContent();
                    console.log("✅ PDF parsed successfully");
                    resolve(rawText.trim());
                } catch (err) {
                    console.error("❌ PDF text extraction error:", err.message);
                    resolve("");
                }
            });

            pdfParser.on('pdfParser_dataError', (errData) => {
                console.error("❌ PDF parse error:", errData.parserError);
                resolve("");
            });

            const absolutePath = path.resolve(filePath);
            pdfParser.loadPDF(absolutePath);
        } catch (error) {
            console.error("❌ PDF extraction error:", error.message);
            resolve("");
        }
    });
};