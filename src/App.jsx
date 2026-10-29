import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadArticles, setSelectedArticle } from './store/slices/articlesSlice.js'
import HomePage from './pages/home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/footer.jsx'
import CreateArticlePage from './pages/createArticle.jsx'
import PageNotFound from './pages/pageNotFound.jsx'

function App() {
    const {articles, filteredArticle} = useSelector((state) => state.articles)
    // const {user, successMessage:success} = useSelector((state) => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
              await dispatch(LoadArticles()).unwrap().then((response) => {
                const firstArticle = response.data?.[0]
            if (firstArticle) {
                dispatch(setSelectedArticle(firstArticle))
            }
              }).catch((error) => {
            console.error("Failed to load articles:", error)
        })
        }
        fetchData();
         console.log(`${articles.length} articles loaded.`);
    }, [])
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Navbar/>
                <main className="page-shell">
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        {articles.map((val) => {
                            return (
                                <Route path={`/${val.slug}`} element/>
                            )
                        })}
                        <Route path='/create' element={<CreateArticlePage/>}/>
                        <Route path='*' element={<PageNotFound/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App
