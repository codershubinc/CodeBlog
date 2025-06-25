/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({
    children,
    authentication = true,
    route = "/dashboard"
}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        console.log("authStatus", authStatus);
        console.log("authentication", authentication);
        console.log("route", route);


        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate(route)
        }
        setLoader(false)
    }, [authStatus, navigate, authentication, route])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}