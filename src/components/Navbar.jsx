import gitspediaLogo from "../assets/gitspediaLogo.png";
import SearchBar from "./SearchBar";
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import { filterArticles } from "../pages/home";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const nav = useNavigate();
    const {articles} = useSelector((state) => state.articles);
    const [filteredArticles, setFilteredArticles] = useState([]);
    return (
        <>
        <nav>
            <div className="nav-title-parent pointer" onClick={() => {
                nav('/');
            }} >
                <img className="nav-title-img" width={200} src={gitspediaLogo}></img>
            </div>
            <div className="nav-search">
                 <SearchBar onChange={(e) => {setFilteredArticles(filterArticles(e.currentTarget.value, articles));}} />
        {[...filteredArticles].map((val) => {
            return (
                <div className='search-result pointer'>
                    <p>{val.title}</p>
                    <p>{val.short_desc}</p>
                </div>
            )
        })}
            </div>
        </nav>
        </>
    )
}
export default Navbar;