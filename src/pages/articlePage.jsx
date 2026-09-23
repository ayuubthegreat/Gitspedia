import { CreateComment, LoadComments, DeleteComment, Like_UnlikeComment, ClearReactionOfComment } from "../store/slices/commentsSlice";
import { Link, useNavigate } from "react-router-dom";
import "../pages/articlePage.css"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DOMPurify from "dompurify";
import { DeleteArticle } from "../store/slices/articlesSlice";
import { use } from "react";
import { useEffect } from "react";
import {UpdateArticle} from "../store/slices/articlesSlice";




const CommentsPage = ({articleId}) => {
   
    const {comments} = useSelector((state) => state.comments)
    const {user} = useSelector((state) => state.user)
     const hasLikedComment = (comment) => {
        if (!user) return false;
        return comment.likes?.some((like) => like.userID === user.id && like.type === "Like");
    }
    const hasDislikedComment = (comment) => {
        if (!user) return false;
        return comment.likes?.some((like) => like.userID === user.id && like.type === "Dislike");
    }
    const dispatch = useDispatch();
    const onSubmitComment = ({articleID, commentData}) => {
        dispatch(CreateComment({articleID, commentData})).unwrap();
    }
    const onSubmitDeleteComment = ({commentId}) => {
        // Add your delete comment logic here
        dispatch(DeleteComment({commentId})).unwrap();
    }
    const articleComments = comments;
    useEffect(() => {
        dispatch(LoadComments({articleId})).unwrap();
        console.log(`Article viewed and comments loaded: ${articleComments}`);
    }, [dispatch, articleId]);
    return (
        <div className="comments-page-container">
            <div className="comments-header">
                <h2>Comments</h2>
            </div>
            <div className="comments-content-section">
                {articleComments.length === 0 ? (
                <>
                 <p>No comments yet. {user && "Be the first to comment!"}</p>
                    <p>{!user && <Link to="/login">Log in to be the first to comment!</Link>}</p>
                </>
            ) : articleComments.map((comment) => {
                console.log(`Rendering comment: ${comment.likes}`);
                return (
                <div key={comment.id} className="commentCard" style={{position: "relative", backgroundColor: `${user && user.role === "SUPERADMIN" ? "#f6d7d3" : "#f8fcf8"}`}}>
                    <div className="comment-card-controls">
                        {user && (user.username === comment.username) && (
                            <button type="button" onClick={() => {
                                onSubmitDeleteComment({commentId: comment.id});
                            }}>Delete</button>
                        )}
                        </div>
                    <h5>{comment.username}-----{new Date(comment.createdAt).toLocaleString()}</h5>
                    <p>{comment.content}</p>
                    <div className="comment-card-actions">
                        {user && (
                            <>
                                <button type="button" onClick={() => {
                                    if (hasLikedComment(comment))
                                        dispatch(ClearReactionOfComment({commentId: comment.id, type: "Like", userID: user.id, articleID: articleId})).unwrap();
                                    else
                                        dispatch(Like_UnlikeComment({commentId: comment.id, type: "Like", userID: user.id, articleID: articleId})).unwrap();
                                    
                                }} style={{color: hasLikedComment(comment) ? "blue" : "black"}}>Like</button>
                                <button type="button" onClick={() => {
                                    if (hasDislikedComment(comment))
                                        dispatch(ClearReactionOfComment({commentId: comment.id, type: "Dislike", userID: user.id, articleID: articleId})).unwrap();
                                    else
                                        dispatch(Like_UnlikeComment({commentId: comment.id, type: "Dislike", userID: user.id, articleID: articleId})).unwrap();
                                }} style={{color: hasDislikedComment(comment) ? "red" : "black"}}>Dislike</button>
                            </>
                        )}
                    </div>
                </div>
            )})}
            </div>
            {user && (
            <div className="add-comment-section">
                <input type="text" placeholder="Add a comment..." id="comment-input" />
                <button type="button" onClick={() => {
                    if (!document.getElementById("comment-input").value) return;
                    const commentInput = document.getElementById("comment-input");
                    const commentData = { content: commentInput.value, username: user.username, email: user.email };
                    console.log(commentData);
                    onSubmitComment({articleID: articleId, commentData});
                    commentInput.value = "";
                }}>Submit</button>
            </div>
            )}
        </div>
    )
}

const toHTML = (text) => DOMPurify.sanitize((text ?? "").replace(/\n/g, "<br>"));

const ArticlePage = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {articles} = useSelector((state) => state.articles)
    const {comments} = useSelector((state) => state.comments)
    const {user} = useSelector((state) => state.user)
    const [hasViewedArticle, setHasViewedArticle] = useState(false);
    const article = articles.find((article) => article.id === id);
    useEffect(() => {
    if (!hasViewedArticle) {
        setHasViewedArticle(true);
       dispatch(UpdateArticle({articleData: {...article, views: (article.views ?? 0) + 1}})).unwrap();
       dispatch(LoadComments({articleId: id})).unwrap();
      
    }
     console.log(`Article viewed and comments loaded: ${comments}`);
}, [hasViewedArticle]);
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
                    <button>Comments</button>
                    <h6>{article.views ?? 0} views</h6>
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
            <div className="comments-section">
                     <CommentsPage articleId={id} />
                    </div>
        </div>
    )
}
export default ArticlePage