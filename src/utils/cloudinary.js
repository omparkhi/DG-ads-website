/**
 * Uploads an image file directly from the browser to Cloudinary CDN
 * using an unsigned upload preset.
 * 
 * @param {File} file - The file object from input type="file"
 * @returns {Promise<string>} The secure HTTPS URL returned by Cloudinary
 */
export async function uploadToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "demo";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";

  if (!file) throw new Error("No file selected for upload.");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Failed to upload image to Cloudinary.");
    }

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}
