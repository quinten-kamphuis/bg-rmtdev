import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
    let message = "An error occurred";
    if (error instanceof Error) {
        toast.error(error.message);
    } else if (typeof error === "string") {
        message = error;
    } else if (typeof error === "object") {
        message = JSON.stringify(error);
    }
    toast.error(message);
}