import { useState } from "react"
import { useForm } from "react-hook-form";
import "./createArticle.css"



const CreateArticlePage = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm({})
    const contentTypes = ["paragraph", "author's note", "link"]
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
            <div>
                
            </div>
        </div>
    </>), (<>
    
    </>)]
    const [pageNum, setPageNum] = useState(0);
    const [displayWindow, setDisplayWindow] = useState(false);
    
    return (
        <>
        <div className="full center-text">
            <div>
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
                </div>
            </div>

        </div>
        </>
    )
}
export default CreateArticlePage;