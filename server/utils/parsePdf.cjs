// server/utils/parsePdf.cjs
const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2];

if (!filePath) {
    console.error('No file path provided');
    process.exit(1);
}

const buffer = fs.readFileSync(filePath);
pdf(buffer).then(data => {
    process.stdout.write(data.text);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});