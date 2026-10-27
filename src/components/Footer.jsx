import { BASE_DATA } from "../BASE_DATA";
import './footer.css'


const Footer = () => {
return (
    <>
    <div className="footer">
        <div className="footer-copyright-text full center-text">
            <p>Gitspedia is a service of {BASE_DATA.STUDIO_NAME}. &copy; 2026 {BASE_DATA.STUDIO_NAME}. All rights reserved.</p>
        </div>
    </div>
    </>
)
}
export default Footer;