import { Link } from "react-router-dom"


const PageNotFound = () => {
    return (
        <>
        <div className="main-header center-text">
            <h1>Page Not Found</h1>
            <p>We're actively working on this website---<Link to="https://www.crescentmoonstudios.com/products-schedule">check up on this website's progress!</Link><br></br>Perhaps your requested page will be added soon.<br></br>Thank you for your patience!</p>
        </div>
        </>
    )
}

export default PageNotFound;