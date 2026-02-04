const XLSX = require('xlsx');
const path = require('path');

const excelPath = path.join(__dirname, '../HS CHUAN BI/2.0 PL KHLCNT Chuanbi-KIET 35.xlsx');
const workbook = XLSX.readFile(excelPath);

console.log('Sheet Names:', workbook.SheetNames);
console.log('\n=== Analyzing first sheet ===\n');

const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
const range = XLSX.utils.decode_range(firstSheet['!ref']);

console.log(`Range: ${firstSheet['!ref']}`);
console.log(`Rows: ${range.s.r} to ${range.e.r}`);
console.log(`Cols: ${range.s.c} to ${range.e.c}`);

// Find cells containing keywords
const keywords = [
  'tổng mức đầu tư',
  'chi phí chuẩn bị',
  'phí thẩm định',
  'tổng chi phí',
  'chi phí xây dựng',
  'thiết bị',
  'quản lý dự án'
];

console.log('\n=== Searching for data cells ===\n');

for (let row = range.s.r; row <= range.e.r; row++) {
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
    const cell = firstSheet[cellAddress];

    if (cell && cell.v) {
      const value = cell.v.toString().toLowerCase();

      // Check if cell contains any keyword
      for (const keyword of keywords) {
        if (value.includes(keyword)) {
          // Try to find value in nearby cells (right or below)
          const rightCell = firstSheet[XLSX.utils.encode_cell({ r: row, c: col + 1 })];
          const belowCell = firstSheet[XLSX.utils.encode_cell({ r: row + 1, c: col })];

          console.log(`Found at ${cellAddress} (Row ${row + 1}, Col ${String.fromCharCode(65 + col)}): "${cell.v}"`);
          if (rightCell && rightCell.v) {
            console.log(`  → Right cell: ${rightCell.v}`);
          }
          if (belowCell && belowCell.v) {
            console.log(`  ↓ Below cell: ${belowCell.v}`);
          }
          console.log('');
        }
      }
    }
  }
}

// Print first 20 rows to see structure
console.log('\n=== First 20 rows of data ===\n');
const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
data.slice(0, 20).forEach((row, idx) => {
  console.log(`Row ${idx + 1}:`, row);
});
