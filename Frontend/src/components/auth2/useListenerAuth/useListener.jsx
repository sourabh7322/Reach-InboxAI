import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthState } from "../../auth/authSlicer";

const useListener = () => {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch the new authentication state to the Redux store
        dispatch(setAuthState({ isAuthenticated, user, isLoading }));
    }, [dispatch, isAuthenticated, user, isLoading]);

    return { isLoading, isAuthenticated };
}

export default useListener;
