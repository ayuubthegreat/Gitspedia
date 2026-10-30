import { useNavigate } from "react-router-dom";
import { DescriptiveImage } from "../components/DescriptiveImage";
import DOMPurify from "dompurify";
import "./articlePage.css"


const ArticlePage = ({article}) => {
    const navigate = useNavigate();
    return (
        <>
        <div className="article-page">
            <div>
                {/* <button onClick={() => {
                    navigate(`/edit/${article.id}`);
                }}>Edit Article</button> */}
            </div>
            <div className="grid">
             <div className="page">
                 <div>
                <h1>{article.title}</h1>
            </div>
            <div>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(article.main_paragraph) ?? ""}}></p>
            </div>
            </div>
            <div className="flex center-text page infobox">
                <h2 className="center-text">{article.title}</h2>
                {[...article.displayImageContent].map((val, i) => {
                     const images = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const img = images[val.key];
                    return (
                        <>
                        <img className="img-fit" src={img}/>
                        <p>{val.value}</p>
                        </>
                    )
                })}
                {[...article.infoboxFields].map((val, i) => {
                    return (
                        <>
                        <div className="flex row">
                           <p style={{fontWeight: "bold"}}>{val.key}</p>
                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(val.value) ?? ""}}></p>  
                        </div>
                       
                        </>
                    )
                })}
            </div>
            </div>
            <div className="page">
               {[...article.content].map((val) => {
                return (
                    <>
                    <h2 style={{marginLeft: "50px"}}>{val.key}</h2>
                    <p style={{marginLeft: "80px"}}>{val.value}</p>
                    </>
                )
               })}
            </div>
            
           
        </div>
        </>
    )
}
export default ArticlePage;