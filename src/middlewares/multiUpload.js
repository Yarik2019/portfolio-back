import { upload } from "./upload.js";

export const multiUpload = (fieldName, maxCount = 1) => {
  if (maxCount === 1) {
    return upload.single(fieldName);
  }

  return upload.array(fieldName, maxCount);
};
