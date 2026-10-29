import { useNavigate } from "react-router-dom";


const ArticlePage = ({article}) => {
    const navigate = useNavigate();
    return (
        <>
        <div className="article-page">
            <div>
                <button onClick={() => {
                    navigate(`/edit/${article.id}`);
                }}>Edit Article</button>
            </div>
            <div>
                <h1>{article.title}</h1>
            </div>
            <div>
                <p dangerouslySetInnerHTML={{__html: article.main_paragraph}}></p>
            </div>
        </div>
        </>
    )
}
export default ArticlePage;