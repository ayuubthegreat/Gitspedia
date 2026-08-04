import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import { LoginPage, RegisterPage } from './pages/loginRegisterPages.jsx'
import Home from '../src/home.jsx'
import './App.css'
import Navbar from './components/navbar.jsx'
import ArticlesPage from './pages/articles.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadArticles } from './store/slices/articlesSlice.js'
import { GetUserInfo } from './store/slices/usersSlice.js'
import { ClearSuccessMessage } from './store/slices/usersSlice.js'
import { CreateArticlePage } from './pages/createArticle.jsx'
import ArticlePage from './pages/articlePage.jsx'

function App() {
    const {articles} = useSelector((state) => state.articles)
    const {user, successMessage:success} = useSelector((state) => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(LoadArticles()).unwrap();
        if (user == null && localStorage.getItem("user")) {
            // Dispatch an action to load the user based on the ID stored in localStorage
            dispatch(GetUserInfo({id: localStorage.getItem("user")})).unwrap();
        }
        dispatch(ClearSuccessMessage());
    }, [dispatch, user])
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Navbar></Navbar>
                {success && <div className="success-message">Action was successful!</div>}
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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
