import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadArticles } from './store/slices/articlesSlice.js'

function App() {
    const {articles} = useSelector((state) => state.articles)
    // const {user, successMessage:success} = useSelector((state) => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(LoadArticles()).unwrap();
    }, [dispatch, user])
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Navbar></Navbar>
                {success && <div className="success-message">Action was successful!</div>}
                <main className="page-shell">
                    <Routes>
                       <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/articles" element={<ArticlesPage/>}/>
                        <Route path="/create" element={<AuthenticationFirewall needsAuthentication={true}><CreateArticlePage/></AuthenticationFirewall>}/>
                        {articles && articles.length > 0 && articles.map((article) => {
                            return <Route key={article.id} path={`/articles/${article.id}`} element={<ArticlePage id={article.id} />} />
                        })}
                        {articles && articles.length > 0 && articles.map((article) => {
                            return <Route key={article.id} path={`/articles/editArticle/${article.id}`} element={<AuthenticationFirewall needsAuthentication={true}><CreateArticlePage isEditing={true} articleData={article}/></AuthenticationFirewall>} />
                        })}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App
