import { Link } from "react-router-dom";
import { BASE_DATA } from "../BASE_DATA";
import './Footer.css'
import cmsLogo from "../assets/cmsLogo.png"


const Footer = () => {
return (
    <>
    <div className="footer flex row between middle">
            <img src={cmsLogo} width={100}/>
            <p className="footer-copyright-text center-text full">Gitspedia is a service of <Link to={"https://www.crescentmoonstudios.com"}>{BASE_DATA.STUDIO_NAME}</Link>. &copy; 2026 {BASE_DATA.STUDIO_NAME}. All rights reserved.</p>
    </div>
    </>
)
}
export default Footer;