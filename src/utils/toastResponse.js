import { toast } from "react-toastify";

const success = (messages) => {
    toast.success(messages, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

}
const error = (messages) => {
    toast.error(messages, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
}

export default {success,error}