import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form";
import "./createArticle.css"
import { DeleteIcon, ImageIcon, LinkIcon, PlusIcon } from "lucide-react";
import { articleContentSchema, articleInfoboxSchema, articleSchema, CreateArticle, LoadArticles, UpdateArticle } from "../store/slices/articlesSlice";
import RichTextEditor from "../components/RichTextEditor";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const CreateArticlePage = ({article = null}) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        reset
    } = useForm({defaultValues: article ?? articleSchema})
    const { fields: infoboxFields, append, remove } = useFieldArray({
        control,
        name: "infoboxFields"
    })
    const {fields: displayImageContent, append: appendImgContent, remove: removeImgContent} = useFieldArray({
        control,
        name: "displayImageContent"
    })
    const {fields: contentBody, append: appendContentBodyPart, remove: removeContentBodyPart} = useFieldArray({
        control,
        name: "content"
    })
    const [pageNum, setPageNum] = useState(0);
    const [popUpPosition, setPopUpPosition] = useState(null);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const pages = [(<>
    <div className="overflow-scroll">
    <div>
        <div className="header">
             <h3>Title</h3>
            <p>Title of the article</p>
        </div>
       
        <input className="full" {...register("title")} placeholder="Title"/>
    </div>
    <div>
        <div className="header">
           <h3>Slug</h3>
        <p>Phrase following the main link of Gitspedia (ex. www.gitspedia.org/<strong>an-article</strong>)</p> 
        </div>
        
        <input className="full" {...register("slug")} placeholder="Slug"/>
    </div>
    <div>
        <div className="header">
            <h3>Short Description</h3>
        <p>Will be shown in short article card in the Articles page</p>
        </div>
        
        <input className="full" {...register("short_desc")} placeholder="Short description"/>
    </div>
    <div>
        <div className="header">
         <h3>Main Paragraph*</h3>
        <p>Will be shown first in article. In mobile and tablet displays, the infobox will go under this paragraph
        </p>
        </div>
        <textarea className="full" style={{height: 300}} {...register("main_paragraph")} placeholder="Main paragraph"/>
    </div>
    </div>
    </>), (<>
        <div className="overflow-scroll">
        <div>
            <h3>Infobox</h3>
            <div className="full">
                {infoboxFields.map((field, i) => {
                    return (
                        <div className="flex" key={field.id}>
                        <button type="button" onClick={() => remove(i)}><DeleteIcon/></button>
                        <label>Key</label>
                        <input {...register(`infoboxFields.${i}.key`)} placeholder="Enter key...."/>
                        <label>Value</label>
                        <input {...register(`infoboxFields.${i}.value`)} placeholder="Enter value...."/>
                        </div>
                    )
                })}
                <button type="button" onClick={() => append({...articleInfoboxSchema})}>
                    <PlusIcon/>Add Infobox Value
                </button>
            </div>
        </div>
        </div>
    </>), (<>
    <div className="overflow-scroll">
        <div>
            <h3>Content*</h3>
            <p>Paragraphs of the article</p>
            <div className="flex">
                {contentBody.map((val, i) => {
                    return (
                        <>
                        <button type="button" onClick={() => {removeContentBodyPart(i);}}><DeleteIcon/></button>
                        <label>Header</label>
                        <input {...register(`content.${i}.key`)}></input>
                        <label>Body</label>
                        <textarea style={{height: 300}} {...register(`content.${i}.value`)}/>
                        </>
                    )
                })}
                <div>
                    <button type="button" onClick={() => {appendContentBodyPart({...articleInfoboxSchema})}}>Add Content Block</button>
                </div>
            </div>
            
        </div>
        <div>
            <h3>Display Images and Descriptions</h3>
            {displayImageContent.map((imgContent, i) => {
                return (
                    <>
                    <div className="flex"> 
                        <button type="button" onClick={() => removeImgContent(i)}><DeleteIcon/></button>
                        <label>Image Link (must be relative)</label>
                        <input {...register(`displayImageContent.${i}.key`)} placeholder="Enter image link..."/>
                        <label>Image description</label>
                        <input {...register(`displayImageContent.${i}.value`)} placeholder="Enter image description..."/>
                    </div>
                    </>
                )
            })}
            <button type="button" onClick={() => appendImgContent({...articleInfoboxSchema})}>Add Image Content</button>
        </div>
        </div>
    </>)]
    
    const onSubmit = async (data) => {
        console.log(data);
        try {
            if (article === null) {
                 await dispatch(CreateArticle({articleData: data})).unwrap();
                 alert("Article created successfully!!")
            } else {
                await dispatch(UpdateArticle({articleData: data})).unwrap();
                alert(`Article ${article.title} updated successfully!`);
                nav(`/${data.slug}`);
            }
            dispatch(LoadArticles());
            reset();
        } catch (error) {
            console.error(error);
            alert("Couldn't create article. " + error);
        }

    }
   
    return (
        <>
        {popUpPosition && (<div className="popup" style={{left: popUpPosition.x, right: popUpPosition.y + 8}}>
                    <button type="button">X</button>
                    {renderPopupGraphics()}
                    <button type="button" onClick={() => {onPopupSubmit();}}>Submit</button>
                </div>)}
        <div className="full center-text">
            <div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="main-header">
                    <h1>Create Gitspedia Article</h1>
                    <p>* = Must be written in HTML</p>
                </div>
                {pages[pageNum]}
                <div className="page-control-panel">
                    <button type="button" onClick={() => {
                        setPageNum(Math.max(0, pageNum - 1));
                    }}>Previous</button>
                    <p>{pageNum + 1} of {pages.length}</p>
                    <button type="button" onClick={() => {
                        setPageNum(Math.min(pageNum + 1, pages.length - 1))
                    }}>Next</button>
                    <button type="submit">{article === null ? "Submit" : "Edit"}</button>
                </div>
                 </form>
            </div>
          
        </div>
        </>
    )
}
export default CreateArticlePage;