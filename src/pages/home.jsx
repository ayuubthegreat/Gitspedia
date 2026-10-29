import './home.css'
import SearchBar from '../components/SearchBar';
import { BASE_DATA } from '../BASE_DATA';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const filterArticles = (text, articles) => {

        if (text === "") {
            return [];
        } else {
            return [...articles].filter((val) => {
            const title = val.title ?? "";
            return title.toLowerCase().includes(text.toLowerCase());
        })
        }
    }
const HomePage = () => {
    const [filteredArticles, setFilteredArticles] = useState([]);
    const {articles} = useSelector((state) => state.articles);
    const nav = useNavigate();
return (
    <>
    <div className='flex header full center-text main-section'>
        <h1 className='heading-text'>Welcome to {BASE_DATA.WEBSITE_NAME}!</h1>
        <h3 className='subheading-text'>The official encyclopedia of {BASE_DATA.STUDIO_NAME}</h3>
        <div className=''>
            <p>Search for any article</p>
        <SearchBar onChange={(e) => {setFilteredArticles(filterArticles(e.currentTarget.value, articles));}} />
        {[...filteredArticles].map((val) => {
            return (
                <div className='search-result pointer' onClick={() => {
                    nav(`/${val.slug}`);
                }}>
                    <p>{val.title}</p>
                    <p>{val.short_desc}</p>
                </div>
            )
        })}
        </div>
    </div>
    <div className='full'>
        <h1 className='heading-text'>Recent Articles</h1>
    </div>
    </>
)
}
export default HomePage;