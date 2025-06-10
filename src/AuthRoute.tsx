import React, { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
    const {children} = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log("User not authenticated, redirecting to login");
                setLoading(false);
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    if (loading) return <p> </p>

    return <div>{children}</div>;
}

export default AuthRoute;