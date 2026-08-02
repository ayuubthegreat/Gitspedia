import { useSelector } from "react-redux";
import "../pages/articles.css"
import { useNavigate } from "react-router-dom";



const ArticlesPage = () => {
    const navigate = useNavigate();
    const {articles} = useSelector((state) => state.articles)
    return (
        <section className="articles-page">
        <div className="articles-header">
            <h1>Article Library</h1>
            <p>Browse the latest studio notes, worldbuilding lore, and development documentation.</p>
        </div>
        {(articles && articles.length > 0) ? (
            <div className="articles-container">
                {articles.map((article) => {
                    return (
                        <div key={article.id} className="article-card" onClick={() => {navigate(`/articles/${article.id}`)}}>
                            <span className="card-eyebrow">Article</span>
                            <h2>{article.title}</h2>
                            <p>{article.searchBlurb}</p>
                            <span className="card-link">Read full entry</span>
                        </div>
                    )
                })}
            </div>
        ) : (
            <p className="empty-message">No articles available yet. Create the first one from the Create Article page.</p>
        )}
        </section>
    )
}

export default ArticlesPage;