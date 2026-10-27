import { useState } from "react"
import { useForm } from "react-hook-form";
import "./createArticle.css"
import { Plus, PlusCircle, PlusIcon } from "lucide-react";



const CreateArticlePage = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm({})
    const [pageNum, setPageNum] = useState(0);
    const [displayWindow, setDisplayWindow] = useState(false);
    const [contentBlocks, setContentBlocks] = useState([]);
    const contentTypes = ["paragraph", "author's note", "link", "None"]
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
            <div className="">
                {contentBlocks.length > 0 && contentBlocks.map((val, i) => {
                    return (
                        <>
                        {Object.entries(val).map(([key, value]) => {
                            return (
                                <>
                                <button onClick={() => {
                                    const tempBlocks = [...contentBlocks];
                                    delete tempBlocks[i];
                                    setContentBlocks(tempBlocks);
                                }}>Delete</button>
                                <select>
                                    {[...contentTypes].map((contentType) => {
                                        return (
                                            <>
                                            <option value={contentType}>{contentType}</option>
                                            </>
                                        )
                                    })}
                                </select>
                                <textarea onChange={() => {

                                }}></textarea>
                                </>
                            )
                        })}
                        <button>Create New Field</button>
                        </>
                    )
                })}
            </div>
            <button onClick={() => {setContentBlocks([...contentBlocks, {[contentTypes[0]]: "Value"}])}}><PlusIcon></PlusIcon>Create Content Block</button>
        </div>
    </>), (<>
    
    </>)]
    
    
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