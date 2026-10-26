import './home.css'
import SearchBar from '../components/SearchBar';
import { BASE_DATA } from '../BASE_DATA';
const HomePage = () => {
return (
    <>
    <div className='flex center header'>
        <h1>Welcome to {BASE_DATA.WEBSITE_NAME}!</h1>
        <h3>The official encyclopedia of {BASE_DATA.STUDIO_NAME}</h3>
    </div>
    </>
)
}
export default HomePage;