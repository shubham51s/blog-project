import toast from "react-hot-toast";

export const showToast = (msg, type = null) => {
  toast.dismiss();

  if (type === "success") {
    toast.success(msg);
  } else if (type === "error") {
    toast.error(msg);
  } else if (type === "loading") {
    toast.loading(msg);
  } else {
    toast(msg);
  }
};
