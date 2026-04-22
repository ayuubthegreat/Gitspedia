import { Link, useNavigate } from "react-router-dom";
import "../pages/articlePage.css"
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { DeleteArticle } from "../store/slice";


const toHTML = (text) => DOMPurify.sanitize((text ?? "").replace(/\n/g, "<br>"));

const ArticlePage = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {articles} = useSelector((state) => state.articles)
    const article = articles.find((article) => article.id === id);
    if (!article) {
        return <p>Article not found.</p>
    }
    return (
        <div className="article-page-container">
            <div className="article-page-actions">
            <Link to={`/articles/editArticle/${article.id}`}>Edit Article</Link>
            <a onClick={() => {
                dispatch(DeleteArticle({id})).unwrap()
                navigate("/");
            }}>Delete Article</a>
            </div>
            <div className="separator"></div>
            <div className="article-main-container">
                <div className="article-main-content">
                
                     <h1>{article.title}</h1>

               <div>
                    <p dangerouslySetInnerHTML={{ __html: toHTML(article.mainParagraph) }}></p>
            {article.paragraphs?.map((paragraph, index) => (
                <div key={index}>
                    <h2>{paragraph.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: toHTML(paragraph.content) }}></p>
                </div>
            ))}
                </div>
                
               </div>
                <div className="infobox">
                    <h1>{article.title}</h1>
                    {article.infobox?.imageLink && <img src={article.infobox.imageLink} alt="Infobox Image" />}
                    {article.infobox?.fields && article.infobox.fields.map((field, index) => (
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