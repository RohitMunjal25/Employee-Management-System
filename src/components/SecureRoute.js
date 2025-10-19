import { Children } from "react";
import { Navigate } from "react-router-dom";

const SecureRoute=({Children})=>{
    const token=localStorage.getItem('token');
    if(!token){
        return<Navigate to="/" replace />;
     }
     return Children;
}
export default SecureRoute;