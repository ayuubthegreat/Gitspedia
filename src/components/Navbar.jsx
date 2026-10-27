import gitspediaLogo from "../assets/gitspediaLogo.png";
import SearchBar from "./SearchBar";
import './Navbar.css'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    return (
        <>
        <nav>
            <div className="nav-title-parent pointer" onClick={() => {
                nav('/');
            }} >
                <img className="nav-title-img" width={200} src={gitspediaLogo}></img>
            </div>
            <div className="nav-search">
                <SearchBar/>
            </div>
        </nav>
        </>
    )
}
export default Navbar;