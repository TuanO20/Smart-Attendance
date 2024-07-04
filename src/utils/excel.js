import * as XLSX from 'xlsx';

export const exportToExcel = (data, columns, filename = 'data.xlsx') => {
    const orderedData = data.map((row) => {
        let orderedRow = {};
        columns.forEach((col) => {
            orderedRow[col] = row[col];
        });
        return orderedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(orderedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
}
