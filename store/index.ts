import { createWrapper, MakeStore } from "next-redux-wrapper"
import {AnyAction, applyMiddleware, legacy_createStore as createStore, Store} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {reducer, RooState} from "./reducers";


const makeStore: MakeStore<Store<RooState, any> > = () => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<Store<RooState, any>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<
    Store<RooState, any>,
    void,
    AnyAction
>