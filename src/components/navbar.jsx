import { Link } from "react-router-dom"
import "../components/navbar.css"


const  Navbar = () => {
    return (
        <>
        <nav>
            <Link to={"/"} className="title-link">Gitspedia</Link>
            <div className="nav-links">
                <Link to={"/about"}>About</Link>
                <Link to={"/articles"}>Articles</Link>
            </div>
            <input className="search-bar" placeholder="Search"></input>
        </nav>
        </>
    )
}
export default Navbar