import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {useTypeSelector} from "../hooks/useSelector";
import {useActions} from "../hooks/actionCreator";
import Cookies from "js-cookie";

interface IProtectedRoute {
    children: React.ReactNode
}

const ProtectedRoute: FC<IProtectedRoute> = ({children}) => {
    const router = useRouter()
    const {checkAuth, loginGoogle} = useActions()
    const {user, isAuth, isAuthChecked} = useTypeSelector((store) => store.auth)

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        const data = Cookies.get("user")
        const user = JSON.parse(data || "{}")
        if(user?.accessToken || user?.user){
            loginGoogle(user.accessToken, user.user)
        }
    }, [])

    useEffect(() => {
        if(!isAuth && isAuthChecked) {
            router.push("/login")
        }
    }, [user, router.pathname])

    return <>{user ? children : null}</>
}

export default ProtectedRoute