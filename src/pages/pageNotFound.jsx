import { Link } from "react-router-dom"


const PageNotFound = () => {
    return (
        <>
        <div className="main-header center-text">
            <h1>Page Not Found</h1>
            <p>We're actively working on this website---<Link to="https://www.crescentmoonstudios.com/products-schedule">check up on this website's progress!</Link></p>
        </div>
        </>
    )
}

export default PageNotFound;