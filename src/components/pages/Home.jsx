import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Home() {

    const navigator = useNavigate()
    useEffect(() => {
        navigator("/post")
    }, [navigator])


    return (
        <div className='flex flex-col'>
            home

            <Link to="/post" className="text-3xl dark:text-white  font-['jersey-25']  ">view posts</Link>
        </div>
    )
}

export default Home
