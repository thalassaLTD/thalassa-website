
// utils/firebaseUtils.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const fetchFileUrl = async (city, format, independentVariable, dependentVariable, statisticalTest, year) => {
  const storage = getStorage();
  const fileRef = ref(storage, `/Experiments/Spatial Analysis/${city}/${format}/${independentVariable}_${dependentVariable}_${statisticalTest}_${year}.html`);
  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
};
