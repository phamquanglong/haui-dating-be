import { useDispatch } from "react-redux";
import { IAppDispatch } from "../store";

export const useAppDispatch: () => IAppDispatch = useDispatch;
