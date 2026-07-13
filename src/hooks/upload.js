import { useRequestHandler } from "./requestHandler";
import imageCompression from "browser-image-compression";

export function useImageUpload() {
  const { requestHandler } = useRequestHandler();
  async function uploadImage(file, options = {}, blobUrl = "") {
    try {
      // 1. Get signature from backend
      const response = await requestHandler("/upload/get-signature");
      const result = await response.json();

      const compressedFile = await imageCompression(file, options);

      console.log("original: ", file.size); // original
      console.log("compressed: ", compressedFile.size); // compressed

      if (response?.status === 200) {
        const { timestamp, signature, api_key, cloud_name, folder } = result;

        // 2. Prepare form data
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        // 3. Upload to Cloudinary
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await uploadRes.json();

        if (!data.public_id || !data.secure_url) {
          return {
            status: 500,
            blobUrl,
          };
        }

        return {
          status: 200,
          data: {
            public_id: data.public_id,
            url: data.secure_url,
          },
          blobUrl,
        };
      }

      return {
        status: 500,
        blobUrl,
      };
    } catch (err) {
      console.error(err);
      return { status: 500, blobUrl };
    }
  }

  async function deleteImages(publicIdArr) {
    try {
      const params = {
        publicIdArr,
      };
      const response = await requestHandler("/upload/delete", "POST", params);
      const result = await response.json();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  return { uploadImage, deleteImages };
}
