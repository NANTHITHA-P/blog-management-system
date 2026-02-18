import { Navigate} from 'react-router-dom';
export default function ProtectedRoute({value,children}){
    if(!value){
        return <Navigate to='/login'/>;
    }
    else{
        return children;
    }
}