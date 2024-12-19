import { Link } from "react-router-dom"

function Home() {


    return (
        <div className='flex flex-col'>
            home

            <Link to="/post" className="text-3xl dark:text-white  font-['jersey-25']  ">view posts</Link>
        </div>
    )
}

export default Home
