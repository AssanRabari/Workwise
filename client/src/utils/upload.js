import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Workwise");
  try {
    const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, data);
    const { url } = res.data;
    return url;

  } catch (err) {
    console.log("Image Upload Error",err);
  }
};

export default upload;
