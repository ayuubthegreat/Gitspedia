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
        <>
        <div className="display-section" style={{ backgroundImage: "url('../src/assets/react.svg')"}} >
            <TextBox title="Welcome to Gitspedia" 
            description="An 'official' studio encyclopedia.
            Made proudly with React and Vite." 
            links={[{name: "Learn More", path: "/about"}]} style={{ maxWidth: "60%" }} />
        </div>
        <div className="display-section" style={{backgroundImage: "url('../src/assets/hero.png')", alignItems: "center"}}>
            <TextBox title={"Official, but not biased"}
            description="This encyclopedia is 'from the horse's mouth' when referring to our projects, but it has been filtered through a neutral lens to avoid bias."
            links={[{name: "Policy", path: "/policy"}]}
            style={{backgroundColor: "gray", color: "white"}}
            />
        </div>
        <div className="display-section" style={{alignItems: "center"}}>
            <TextBox title={"Ready to Browse Our Worlds?"}
            description="Dive in if you dare....."/>
            <input placeholder="Search"></input>
        </div>
        </>
    )
}

export default Home