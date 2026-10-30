import gitspediaLogo from "../assets/gitspediaLogo.png";
import SearchBar from "./SearchBar";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { filterArticles } from "../pages/home";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const nav = useNavigate();
    const {articles} = useSelector((state) => state.articles);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    return (
        <>
        <nav>
            <div className="nav-title-parent pointer" onClick={() => {
                nav('/');
            }} >
                <img className="nav-title-img" width={200} src={gitspediaLogo}></img>
            </div>
            <div className="flex row middle">

            
            <div className="nav-search">
                 <SearchBar onChange={(e) => {
                    setIsEmpty(e.currentTarget.value === "");
                    setFilteredArticles(filterArticles(e.currentTarget.value, articles));
                    }} />
        <div className="search-result-box">
            {!isEmpty && (<>
            {filteredArticles.length === 0 ? (<>
           <div className="search-result">
             <p>No articles found.</p>
           </div>
           </>) : (<>
                {[...filteredArticles].map((val) => {
            return (
                <div className='search-result pointer' onClick={() => {
                    setIsEmpty(true);
                    nav(`/${val.slug}`);
                }}>
                    <p>{val.title}</p>
                    <p>{val.short_desc}</p>
                </div>
            )
        })}
           </>)} 
            </>)}
           
        </div>
            </div>
            <div className="nav-links flex row">
                <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Apply</Link> 
            </div>
           </div>
        </nav>
        </>
    )
}
export default Navbar;