import { Link } from "react-router-dom"
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
            <TextBox title="Welcome to Gitspedia--we're glad you're here" 
            description="A studio encyclopedia built for clear writing, faster discovery, and collaborative project memory." 
            links={[{name: "Learn More", path: "/about"}, {name: "Browse Articles", path: "/articles"}]} style={{ maxWidth: "720px" }} />
        </div>
        <div className="display-section display-feature">
            <TextBox title={"Official, but still objective"}
            description="Articles come from teams closest to the work while maintaining neutral language for better onboarding and decision making."
            links={[{name: "Read Policy", path: "/about"}]}
            />
        </div>
        <div className="display-section display-feature">
            <TextBox title={"Track projects in real time"}
            description="Every project gets one reliable source of truth with milestones, long-form notes, infobox context, and quick summaries."
            links={[{name: "Start Writing", path: "/create"}]}
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