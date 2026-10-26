import './home.css'
import SearchBar from '../components/SearchBar';
import { BASE_DATA } from '../BASE_DATA';
const HomePage = () => {
return (
    <>
    <div className='flex header full center-text main-section'>
        <h1 className='heading-text'>Welcome to {BASE_DATA.WEBSITE_NAME}!</h1>
        <h3 className='subheading-text'>The official encyclopedia of {BASE_DATA.STUDIO_NAME}</h3>
        <div className=''>
            <p>Search for any article</p>
        <SearchBar />
        </div>
    </div>
    <div className='full'>
        <h1 className='heading-text'>Recent Articles</h1>
    </div>
    </>
)
}
export default HomePage;