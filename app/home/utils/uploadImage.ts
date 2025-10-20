export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Postify");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/diicvmo8x/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Cloudinary upload error:", errorText);
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}
