import { Navigate } from "react-router-dom";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "../../config/constant";
import { useAppSelector } from "../../hook/useAppSelector";

interface IProps {
  type: string;
  children: any;
}

export const AuthenticateRoute = (props: IProps) => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  let component = props.children;

  if (
    (!isAuthenticated && props.type === PUBLIC_ROUTE) ||
    (isAuthenticated && props.type === PRIVATE_ROUTE)
  )
    return component;
  else if (!isAuthenticated && props.type === PRIVATE_ROUTE)
    return <Navigate to={"/login"} replace />;
  else if (isAuthenticated && props.type === PUBLIC_ROUTE)
    return <Navigate to={"/"} replace />;
};
