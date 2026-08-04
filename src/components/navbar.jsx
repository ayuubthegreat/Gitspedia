import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {Logout} from "../store/slices/usersSlice"
import "../components/navbar.css"


const  Navbar = () => {
    const {articles} = useSelector((state) => state.articles)
    const {user} = useSelector((state) => state.user)
    const [revealed, setRevealed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const findSearchResults = (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }
        const results = articles.filter(article => article.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
    }
    const LogoutFunction = () => {
        dispatch(Logout());
        nav("/login");
    }
    return (
        <>
        <nav className="top-nav">
            <Link to={"/"} className="brand-link">
                <img src="https://1drv.ms/i/c/09e336c8c6cc3c06/IQQsDb4g_BnfRrzPmWXhR-9DAZg5KbwbAKxXfEzV9C5kGxQ?width=960&height=320" width={180} alt="Gitspedia" />
            </Link>
            <div className="nav-links">
                <Link className="nav-link" to={"/about"}>About</Link>
                <Link className="nav-link" to={"/articles"}>Articles</Link>
                {user && user.role === "SUPERADMIN" && <Link className="nav-link nav-link-accent" to={"/create"}>Create Article</Link>}
                {user ? <span className="nav-user">Welcome, {user.username}</span> : <Link className="nav-link" to={"/login"}>Login</Link>}
                {!user && <Link className="nav-link" to={"/register"}>Register</Link>}
                {user && <button className="nav-link" onClick={LogoutFunction}>Logout</button>}
            </div>
            <div className="nav-links-mobile">
                <button className="nav-links-mobile-button" onClick={() => setRevealed(!revealed)}>☰</button>
               {revealed && <div className="nav-links-mobile-dropdown">
                    <Link className="nav-link" to={"/about"}>About</Link>
                    <Link className="nav-link" to={"/articles"}>Articles</Link>
                    {user && user.role === "SUPERADMIN" && <Link className="nav-link nav-link-accent" to={"/create"}>Create Article</Link>}
                    {user ? <span className="nav-user">Welcome, {user.username}</span> : <Link className="nav-link" to={"/login"}>Login</Link>}
                {!user && <Link className="nav-link" to={"/register"}>Register</Link>}
                {user && <button className="nav-link" onClick={LogoutFunction}>Logout</button>}
                </div>}
            </div>
            <div className="nav-search">
            <input className="search-bar" placeholder="Search articles" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); findSearchResults(e.target.value)}} />
            {searchResults && searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((article) => (
                        <div key={article.id} className="search-result-item" onClick={() => {setSearchQuery(""); setSearchResults([])}}>
                            <Link to={`/articles/${article.id}`}>{article.title}</Link>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </nav>
        </>
    )
}
export default Navbar