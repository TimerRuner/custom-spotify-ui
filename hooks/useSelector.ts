import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RooState} from "../store/reducers";

export const useTypeSelector: TypedUseSelectorHook<RooState> = useSelector