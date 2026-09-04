import { Link } from "react-router-dom"
import { BASE_DATA } from "./BASE_DATA"
import "../src/home.css"

const TextBox = ({title, description, links, style}) => {
    return (
        <div className="text-box" style={style}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="text-box-links">
                {(links && links.length > 0) &&links.map(link => <Link to={link.path}>{link.name}</Link>)}
            </div>
        </div>
    )
}
const Home = () => {
    return (
        <div className="home-page">
        <div className="display-section display-hero" >
            <TextBox title={`Welcome to Gitspedia `}
            description={`the official creative encyclopedia for ${BASE_DATA.studio_name}`}
            links={[{name: "Learn More", path: "/about"}, {name: "Browse Articles", path: "/articles"}]} style={{ maxWidth: "720px" }} />
        </div>
        <div className="display-section display-feature">
            <TextBox title={"Official, but not bare"}
            description="This encyclopedia may be official, but it is content-packed, breaking creative website conventions."
            links={[{name: "Read Policy", path: "/about"}]}
            />
              <TextBox title={"Track projects in real time"}
            description="Every project gets one reliable source of truth. As we update and improve our projects, we will occasionally update our Gitspedia articles, always giving you the most recent information--for free."
            style={{width: "100%"}}
            />
        </div>
        <div className="display-section display-cta">
            <TextBox title={"Ready to explore?"}
            description="Jump into the archive and discover what the team has learned, built, and improved."/>
            <input placeholder="Search the archive"></input>
        </div>
        </div>
    )
}

export default Home