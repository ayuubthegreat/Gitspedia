import { useNavigate } from "react-router-dom";
import { DescriptiveImage } from "../components/DescriptiveImage";
import DOMPurify from "dompurify";
import "./articlePage.css"
import { useSelector } from "react-redux";
import { useReducer, useState } from "react";
import { ArrowBigRight, ArrowDown, ArrowRight } from "lucide-react";


const ArticlePage = ({article}) => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    return (
        <>
        <title>{article.title} | Gitspedia</title>
        <div className="article-page outline">
            {user && user.role === "SUPERADMIN" && (
                <> 
                <div>
                <button onClick={() => {
                    navigate(`/edit/${article.id}`);
                }}>Edit Article</button>
            </div>
                </>
            )}
           
            <div className="opening-article-content">
             <div className="page">
                 <div>
                <h1>{article.title}</h1>
            </div>
            <div>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(article.main_paragraph) ?? ""}}></p>
            </div>
             <div className="page large-screen-content">
               {[...article.content].map((val) => {
                return (
                    <>
                    <h2>{val.key}</h2>
                    <p dangerouslySetInnerHTML={{__html: val.value}}></p>
                    </>
                )
               })}
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
                        <div className="flex row infobox-field">
                           <p style={{fontWeight: "bold"}}>{val.key}</p>
                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(val.value) ?? ""}}></p>  
                        </div>
                       
                        </>
                    )
                })}
            </div>
            </div>
            <div className="page small-screen-content">
               {[...article.content].map((val, i) => {
                const paragraph = document.getElementById(`paragraph-${i}`);
                return (
                    <>
                    <h2 className="paragraph-header pointer" style={{marginLeft: "10px"}} onClick={(e) => {
                        if (paragraph != null) {
                            paragraph.classList.toggle("hidden");
                            console.log(isParagraphHidden);
                        }
                    }}> <ArrowDown/>{val.key}</h2>
                    <p id={`paragraph-${i}`} style={{marginLeft: "30px"}} dangerouslySetInnerHTML={{__html: val.value}}></p>
                    </>
                )
               })}
            </div>
            
           
        </div>
        </>
    )
}
export default ArticlePage;