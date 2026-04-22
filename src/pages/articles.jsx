import { useDispatch, useSelector } from "react-redux";
import "../pages/articles.css"
import { CreateArticle } from "../store/slice";
import { useNavigate } from "react-router-dom";



const ArticlesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const CreateDefaultArticleButton = () => {
    const handleCreateArticle = async() => {
       const article = {
        title: "Default Title",
        searchBlurb: "Default Search Blurb",
        mainParagraph: "Default Main Paragraph",
        paragraphs: [
            {
                title: "Default Paragraph Title",
                content: "Default Paragraph Content"
            }
        ],
        infobox: {
            fields: [
                {
                    key: "Default Infobox Key",
                    value: "Default Infobox Value"
                }
            ]
        }
       }
       await dispatch(CreateArticle({articleData: article})).unwrap();
        console.log("Create Article button clicked");
    }
    return (
        <button className="create-article-button" onClick={handleCreateArticle}>
            Create New Article
        </button>
    )
}
    const {articles} = useSelector((state) => state.articles)
    return (
        <>
        {(articles && articles.length > 0) ? (
            <div className="articles-container">
                {articles.map((article) => {
                    return (
                        <div key={article.id} className="article-card" onClick={() => {navigate(`/articles/${article.id}`)}}>
                            <h2>{article.title}</h2>
                            <p>{article.searchBlurb}</p>
                        </div>
                    )
                })}
            </div>
        ) : (
            <p>No articles available.</p>
        )}
        </>
    )
}

export default ArticlesPage;