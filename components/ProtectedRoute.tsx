import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {useTypeSelector} from "../hooks/useSelector";
import {useActions} from "../hooks/actionCreator";

interface IProtectedRoute {
    children: React.ReactNode
}

const ProtectedRoute: FC<IProtectedRoute> = ({children}) => {
    const router = useRouter()
    const {checkAuth} = useActions()
    const {user} = useTypeSelector((store) => store.auth)
    console.log(user)
    useEffect(() => {
        if(localStorage.getItem("token")) {
            checkAuth()
        }
    }, [])

    useEffect(() => {
        if(!Object.keys(user).length) {
            router.push("/login")
        }
    }, [user, router.pathname])

    return <>{user ? children : null}</>
}

export default ProtectedRoute