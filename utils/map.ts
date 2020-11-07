import { indexing } from "googleapis/build/src/apis/indexing";

export const mapObject = (object1, object2) => {
  Object.keys(object1).forEach((key) => {
    object1[key] = object2[key] || object1[key];
  });
  return object1;
};
