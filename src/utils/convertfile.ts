import { read, utils } from "xlsx";

export const convertCsvToJson = (file: any) => {
  if (!file) {
    throw new Error("File Not Uploaded!");
  }

  const inputWorkBook = read(file, { type: "buffer" });

  const inputData = utils.sheet_to_json(
    inputWorkBook.Sheets[inputWorkBook.SheetNames[0]],
    {
      raw: false,
      dateNF: "DD/MM/YYYY",
    }
  );

  // Check if the input data is empty
  if (inputData.length === 0) {
    throw new Error("Uploaded file is empty!");
  }
  // Trim column names
  const trimmedInputData = inputData.map((row: any) => {
    const trimmedRow: any = {};
    for (const key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        trimmedRow[key.trim()] = row[key].trim();
      }
    }
    return trimmedRow;
  });

  // Check the length of trimmedInputData
  const trimmedInputDataLength = trimmedInputData.length;

  // Throw an error if there are more than 500 rows
  if (trimmedInputDataLength > 500) {
    throw new Error(
      `Input data contains more than 500 rows (${trimmedInputDataLength} rows found).`
    );
  }

  return trimmedInputData;
};
