import { Link } from "react-router-dom"
import "../components/navbar.css"


const  Navbar = () => {
    return (
        <>
        <nav className="top-nav">
            <Link to={"/"} className="brand-link">
                <img src="src/assets/frame000000000000.png" width={180} alt="Gitspedia" />
            </Link>
            <div className="nav-links">
                <Link className="nav-link" to={"/about"}>About</Link>
                <Link className="nav-link" to={"/articles"}>Articles</Link>
                <Link className="nav-link nav-link-accent" to={"/create"}>Create Article</Link>
            </div>
            <input className="search-bar" placeholder="Search articles"></input>
        </nav>
        </>
    )
}
export default Navbar