import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";
import toastNotify from "./toastNotify";

export default function useErrorHandler(
    error: FetchBaseQueryError,
    navigate: NavigateFunction,
    currentLocation: string,
    setErrorMessages?: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (!error) {
        toastNotify("An unexpected error occurred", "error");
        return;
    }

    const { status, data } = error;

    if (status) {
        let errorMessage: string[] = [];

        if (data && typeof data === 'object' && 'errors' in data) {
            const errors = data.errors;
            console.log(errors);
            //weird type errors :( 
            errorMessage= Object.values(errors).flat();
        }

        if (setErrorMessages) {
            console.log(errorMessage);
            setErrorMessages(errorMessage);
            return;
        }

        switch (status) {
            case 400:
                toastNotify("Bad Request", "error");
                break;
            case 401:
                toastNotify("Unauthorized", "error");
                break;
            case 403:
                toastNotify("Forbidden", "error");
                break;
            case 404:
                navigate('/not-found');
                return;
            case 500:
                toastNotify("Internal Server Error", "error");
                break;
            case 'PARSING_ERROR':
                toastNotify(data, "error");
                break;
            default:
                toastNotify("An unexpected error occurred", "error");
                navigate('/');
                return;
        }

        navigate(currentLocation);

    } else {
        toastNotify("An unexpected error occurred", "error");
        navigate('/');
    }
}
