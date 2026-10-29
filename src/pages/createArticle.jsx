import { useState } from "react"
import { useForm } from "react-hook-form";
import "./createArticle.css"
import { ImageIcon, LinkIcon } from "lucide-react";
import { articleContentSchema, articleSchema } from "../store/slices/articlesSlice";
import RichTextEditor from "../components/RichTextEditor";



const CreateArticlePage = ({article}) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues
    } = useForm({defaultValues: article ?? articleSchema})
    const [pageNum, setPageNum] = useState(0);
    const [popUpPosition, setPopUpPosition] = useState(null);
    const pages = [(<>
    <div>
        <h3>Title</h3>
        <input className="full" {...register("title")} placeholder="Title"/>
    </div>
    <div>
        <h3>Slug</h3>
        <input className="full" {...register("slug")} placeholder="Slug"/>
    </div>
    <div>
        <h3>Short Description</h3>
        <input className="full" {...register("short_desc")} placeholder="Short description"/>
    </div>
     <div>
        <h3>Long Description</h3>
        <textarea className="full" {...register("long_desc")} placeholder="Long description"/>
    </div>
    </>), (<>
        <div>
            <h3>Content</h3>
            <RichTextEditor get={getValues} register={register}  set={setValue}/>
        </div>
    </>), (<>
    
    </>)]
    
    const onSubmit = (data) => {
        console.log(data);
    }
   
    return (
        <>
        {popUpPosition && (<div className="popup" style={{left: popUpPosition.x, right: popUpPosition.y + 8}}>
                    <button>X</button>
                    {renderPopupGraphics()}
                    <button onClick={() => {onPopupSubmit();}}>Submit</button>
                </div>)}
        <div className="full center-text">
            <div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="header">
                    <h1>Create Gitspedia Article</h1>
                </div>
                {pages[pageNum]}
                <div className="page-control-panel">
                    <button onClick={() => {
                        setPageNum(Math.max(0, pageNum - 1));
                    }}>Previous</button>
                    <p>{pageNum + 1} of {pages.length}</p>
                    <button onClick={() => {
                        setPageNum(Math.min(pageNum + 1, pages.length - 1))
                    }}>Next</button>
                    <button>Submit</button>
                </div>
                 </form>
            </div>
          
        </div>
        </>
    )
}
export default CreateArticlePage;