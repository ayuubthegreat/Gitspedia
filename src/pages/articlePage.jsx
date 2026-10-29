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
            <div className="grid">
             <div>
                 <div>
                <h1>{article.title}</h1>
            </div>
            <div>
                <p dangerouslySetInnerHTML={{__html: article.main_paragraph}}></p>
            </div>
            </div>
            <div>
                <h2>{article.title}</h2>
                {[...article.displayImageContent].map((val, i) => {
                     const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const img = images[val.key];
                    return (
                        <>
                        <img width={300} src={img}/>
                        <p>{val.value}</p>
                        </>
                    )
                })}
                {[...article.infoboxFields].map((val, i) => {
                    return (
                        <>
                        <div className="flex row">
                           <p style={{fontWeight: "bold"}}>{val.key}</p>
                        <p>{val.value}</p>  
                        </div>
                       
                        </>
                    )
                })}
            </div>
            </div>
            
           
        </div>
        </>
    )
}
export default ArticlePage;