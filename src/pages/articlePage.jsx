import { Link, useNavigate } from "react-router-dom";
import "../pages/articlePage.css"
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { DeleteArticle } from "../store/slices/articlesSlice";
import { use } from "react";


const toHTML = (text) => DOMPurify.sanitize((text ?? "").replace(/\n/g, "<br>"));

const ArticlePage = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {articles} = useSelector((state) => state.articles)
    const {user} = useSelector((state) => state.user)
    const article = articles.find((article) => article.id === id);
    if (!article) {
        return <p>Article not found.</p>
    }
    return (
        <div className="article-page-container">
{user && user.role === "SUPERADMIN" && (
    <>
     <div className="article-page-actions">
            <Link className="article-action-link" to={`/articles/editArticle/${article.id}`}>Edit Article</Link>
            <button className="article-action-delete" type="button" onClick={() => {
                dispatch(DeleteArticle({id})).unwrap()
                navigate("/");
            }}>Delete Article</button>
            </div>
    </>
)}
           
            <div className="separator"></div>
            <div className="article-main-container">
                <div className="article-main-content">
                    <div className="article-header">
                     <h1>{article.title}</h1>
                     {article.tags && article.tags.length > 0 && <div className="article-tags">
                        {article.tags.map((tag, index) => (
                            <span key={index} className="article-tag">{tag}</span>
                        ))}
                    </div>}
                    </div>
               <div>
                    <p dangerouslySetInnerHTML={{ __html: toHTML(article.mainParagraph) }}></p>
                     <div className="infobox infobox-mobile">
                    <h1>{article.title}</h1>
                    {article.titleImageLink && <img src={article.titleImageLink} alt="Infobox Image" />}
                    {article.infoboxFields && article.infoboxFields.map((field, index) => (
                        <div key={index} className="infobox-field">
                            <strong>{field.key}: </strong>
                            <span>{field.value}</span>
                        </div>
                    ))}
                </div>

            {article.paragraphs?.map((paragraph, index) => (
                <div key={index}>
                    <h2>{paragraph.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: toHTML(paragraph.content) }}></p>
                </div>
            ))}
                </div>
                
               </div>
                <div className="infobox infobox-desktop">
                    <h1>{article.title}</h1>
                    {article.titleImageLink && <img src={article.titleImageLink} alt="Infobox Image" />}
                    {article.infoboxFields && article.infoboxFields.map((field, index) => (
                        <div key={index} className="infobox-field">
                            <strong>{field.key}: </strong>
                            <span>{field.value}</span>
                        </div>
                    ))}
                </div>
            
            </div>
            
        </div>
    )
}
export default ArticlePage