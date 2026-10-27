import { useState } from "react"
import { useForm } from "react-hook-form";
import "./createArticle.css"
import { Plus, PlusCircle } from "lucide-react";



const CreateArticlePage = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm({})
    const [pageNum, setPageNum] = useState(0);
    const [displayWindow, setDisplayWindow] = useState(false);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [currentContentBlock, setCurrentContentBlock] = useState([]);
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
            <div>
                {[...contentBlocks].map((val) => {
                    return (
                        <>
                         {val.map((block) => {
                            return (
                                <>
                                {Object.entries(block).map(([key, value]) => (
            <p key={key}>
                {key}: {value}
            </p>
        ))}
                                </>
                            )
                         })}
                        </>
                    )
                })}
                <button className="flex middle row" onClick={() => {setDisplayWindow(true);}}><PlusCircle></PlusCircle>Create Content Block</button>
            </div>
        </div>
    </>), (<>
    
    </>)]
    
    
    return (
        <>
        <div className="full center-text">
            <div>
                {displayWindow && (<>
                <div className="backdrop">
                    <div className="display-window full">
                    <div>
                      <h1>Create Content Block</h1>  
                    </div>
                    <div className="flex overflow-scroll">
                                {currentContentBlock.map((parentBlock = {}, i) => {
                        return (
                            <>
                           {Object.entries(parentBlock).map(([key, value]) => (
            <>
            <button onClick={() => {
                const newBlock = [...currentContentBlock];
                delete newBlock[i][key];
                setCurrentContentBlock(newBlock);
            }}>Delete</button>
            <select onChange={(e) => {
                
            }}>
                {contentTypes.map((val) => {
                    return (
                        <>
                        
                        <option value={val}>{val}</option>
                        </>
                    )
                })}
            </select>
            <textarea onChange={(e) => {}}></textarea>
            </>
        ))}
                            </>
                        )
                    })}
                    </div>
            
                    <div>
                       <button onClick={() => {
                        setCurrentContentBlock([...currentContentBlock, {[contentTypes[0]]: "jj"}])
                    }}><PlusCircle/>Add Key</button>
                    <button onClick={() => {
                        const tempContentBlocks = [...contentBlocks];
                        tempContentBlocks.push(currentContentBlock);
                        setContentBlocks(tempContentBlocks);
                        setCurrentContentBlock([]);
                        setDisplayWindow(false);
                    }}>Create Block</button> 
                    </div>
                    
                </div>
                </div>
                
                </>)}
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