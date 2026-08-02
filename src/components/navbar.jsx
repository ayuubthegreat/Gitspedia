import { Link } from "react-router-dom"
import { useState } from "react"
import "../components/navbar.css"


const  Navbar = () => {
    const [revealed, setRevealed] = useState(false);
    return (
        <>
        <nav className="top-nav">
            <Link to={"/"} className="brand-link">
                <img src="https://1drv.ms/i/c/09e336c8c6cc3c06/IQQ8Hv59yB7qRqoQGRvkDaTAAYClMVcPtGz9ypq3L1GKcJI?width=720&height=480" width={180} alt="Gitspedia" />
            </Link>
            <div className="nav-links">
                <Link className="nav-link" to={"/about"}>About</Link>
                <Link className="nav-link" to={"/articles"}>Articles</Link>
                <Link className="nav-link nav-link-accent" to={"/create"}>Create Article</Link>
            </div>
            <div className="nav-links-mobile">
                <button className="nav-links-mobile-button" onClick={() => setRevealed(!revealed)}>☰</button>
               {revealed && <div className="nav-links-mobile-dropdown">
                    <Link className="nav-link" to={"/about"}>About</Link>
                    <Link className="nav-link" to={"/articles"}>Articles</Link>
                    <Link className="nav-link nav-link-accent" to={"/create"}>Create Article</Link>
                </div>}
            </div>
            <input className="search-bar" placeholder="Search articles"></input>
        </nav>
        </>
    )
}
export default Navbar