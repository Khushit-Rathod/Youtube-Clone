import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyC6yuKnRCMFJuHbCZLW7E7sDZVpDDStEJg",
  },
});

export default request;
