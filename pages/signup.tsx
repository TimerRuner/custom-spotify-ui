import React, {FC} from "react";
import {useTypeSelector} from "../hooks/useSelector";
import {Loader} from "../components/Spinner";
import RegistrationForm from "../components/RegistrationForm";

const Registration: FC = () => {
    const {isLoading} = useTypeSelector(store => store.auth)

    if(isLoading){
        return <Loader/>
    }
    return <RegistrationForm/>
}

export default Registration