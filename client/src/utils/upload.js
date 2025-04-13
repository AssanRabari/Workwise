import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Workwise");
  try {
    //const res = await axios.post("C:\Users\ladan\Downloads\Web capture_24-6-2023_174843_localhost.jpeg", data);
    const res = ""
    const { url } = res.data;
    return url;

  } catch (err) {
    console.log("-----------Upload error",err);
  }
};

export default upload;
