import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import Home from '../src/home.jsx'
import './App.css'
import Navbar from './components/navbar.jsx'
import ArticlesPage from './pages/articles.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadArticles } from './store/slice.js'
import { CreateArticlePage } from './pages/createArticle.jsx'
import ArticlePage from './pages/articlePage.jsx'

function App() {
    const {articles} = useSelector((state) => state.articles)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(LoadArticles()).unwrap();
    }, [dispatch])
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Navbar></Navbar>
                <main className="page-shell">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<section className="about-panel"><h1>About Gitspedia</h1><p>Gitspedia is a living studio encyclopedia where teams can document projects, ideas, and milestones in one place.</p></section>} />
                        <Route path="/articles" element={<ArticlesPage/>}/>
                        <Route path="/create" element={<CreateArticlePage/>}/>
                        {articles && articles.length > 0 && articles.map((article) => {
                            return <Route key={article.id} path={`/articles/${article.id}`} element={<ArticlePage id={article.id} />} />
                        })}
                        {articles && articles.length > 0 && articles.map((article) => {
                            return <Route key={article.id} path={`/articles/editArticle/${article.id}`} element={<CreateArticlePage isEditing={true} articleData={article}/>} />
                        })}
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
