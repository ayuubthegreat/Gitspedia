import { useSelector } from "react-redux";
import "../pages/articles.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
    



const ArticlesPage = () => {
    const navigate = useNavigate();
    const {articles} = useSelector((state) => state.articles)
    const [filteredArticles, setFilteredArticles] = useState(articles);

    const getAllTags = () => {
        const tagsSet = new Set();
        articles.forEach(article => {
            if (article.tags && article.tags.length > 0) {
                article.tags.forEach(tag => tagsSet.add(tag));
            }
        });
        return Array.from(tagsSet);
    }
    const filterArticlesByTag = (tag) => {
        const filtered = articles.filter(article => article.tags && article.tags.includes(tag));
        setFilteredArticles(filtered);
    }
    return (
        <section className="articles-page">
        <div className="articles-header">
            <h1>Article Library</h1>
            <p>Browse the latest studio notes, worldbuilding lore, and development documentation.</p>
        </div>
        {getAllTags().length > 0 && (
            <div className="articles-tags">
                <h2>Tags</h2>
                <div className="articles-tags-list">
                    {getAllTags().map((tag, index) => (
                        <span key={index} className="articles-tag" onClick={() => filterArticlesByTag(tag)}>{tag}</span>
                    ))}
                    <span className="articles-tag articles-tag-clear" onClick={() => setFilteredArticles(articles)}>Clear Filter</span>
                </div>
                    </div>
        )}
        {(filteredArticles && filteredArticles.length > 0) ? (
            <div className="articles-container">
                {filteredArticles.map((article) => {
                    return (
                        <div key={article.id} className="article-card" onClick={() => {navigate(`/articles/${article.id}`)}}>
                            {article.tags && article.tags.length > 0 && <div className="card-tags">
                                {article.tags.map((tag, index) => (
                                    <span key={index} className="card-tag">{tag}</span>
                                ))}
                            </div>}
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