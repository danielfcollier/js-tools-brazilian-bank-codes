const configurations = {
  inputCSV: "bc.csv",
  updatedCSV: "./output/bankCodes.csv",
  updatedJSON: "./output/bankCodes.json",
  schema: ["countryId", "bankCode", "ispb", "bankName"],
  json: {
    indentation: 2,
  },
};

export default configurations;
