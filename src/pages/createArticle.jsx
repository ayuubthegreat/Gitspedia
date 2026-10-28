import { useState } from "react"
import { useForm } from "react-hook-form";
import "./createArticle.css"
import { Plus, PlusCircle, PlusIcon } from "lucide-react";
import { articleContentSchema, articleSchema } from "../store/slices/articlesSlice";



const CreateArticlePage = ({article}) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm({defaultValues: article ?? articleSchema})
    const [pageNum, setPageNum] = useState(0);
    const [displayWindow, setDisplayWindow] = useState(false);
    const [contentBlocks, setContentBlocks] = useState({});
     const decipherContent = (data) => {
        let finalString = "";
        Object.entries(contentBlocks).map(([key, val]) => {
            if (key === "text") {
                finalString += val;
            }
        })
    }
    const contentTypes = ["paragraph", "author-note", "link"]
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
            <div className="text-editor-control-panel">

            </div>
            <div className="text-editor">
                <textarea className="full" value={decipherContent()} style={{ maxHeight: "400px", minHeight: "50px", height:"50vw"}}></textarea>
            </div>
        </div>
    </>), (<>
    
    </>)]
    
    const onSubmit = (data) => {
        console.log(data);
    }
   
    return (
        <>
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