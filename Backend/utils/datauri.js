import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) return null;
  const parser = new DataUriParser();
  let extName = path.extname(file.originalname || "").toString() || "";
  if (extName.startsWith(".")) extName = extName.slice(1);

  return parser.format(extName, file.buffer);
};

export default getDataUri;