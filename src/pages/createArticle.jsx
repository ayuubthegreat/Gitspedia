import { useState } from "react"
import { useForm } from "react-hook-form";
import "./createArticle.css"
import { ImageIcon, LinkIcon } from "lucide-react";
import { articleContentSchema, articleSchema } from "../store/slices/articlesSlice";



const CreateArticlePage = ({article}) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues
    } = useForm({defaultValues: article ?? articleSchema})
    const [pageNum, setPageNum] = useState(0);
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
    const [isBoldTextEnabled, setIsBoldTextEnabled] = useState(false);
    const [isItalicTextEnabled, setIsItalicTextEnabled] = useState(false);
    const [beganTyping, setBeganTyping] = useState(false);
    const [subsectionIndex, setSubsectionIndex] = useState(0);

    const addNewContentBlock = () => {
         setCurrentBlockIndex(currentBlockIndex + 1);
         const newContentBlock = articleContentSchema;
                        if (isBoldTextEnabled) {
                            newContentBlock.format.push("bold");
                        }
                        if (isItalicTextEnabled) {
                            newContentBlock.format.push("italic");
                        }
                        setValue("content", [...getValues("content"), newContentBlock]);
    }
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
            <div className="text-editor-control-panel flex row">
                <button onClick={() => {
                    const boldBtn = document.getElementById("bold-btn");
                    if (boldBtn !== null) {
                        setIsBoldTextEnabled(!isBoldTextEnabled);
                        boldBtn.classList.toggle('selected');
                        setBeganTyping(false);
                        addNewContentBlock();
                    }
                }} id="bold-btn"><strong>B</strong></button>
                <button onClick={() => {
                      const italicBtn = document.getElementById("italic-btn");
                    if (italicBtn !== null) {
                        setIsItalicTextEnabled(!isItalicTextEnabled);
                        italicBtn.classList.toggle('selected');
                        setBeganTyping(false);
                        addNewContentBlock();
                    }
                }} id="italic-btn"><em>I</em></button>
                <button id="add-link-btn"><LinkIcon/></button>
                <button id="add-image-btn"><ImageIcon/></button>
                <button>See HTML</button>
            </div>
            <div className="text-editor">
                <textarea onChange={(e) => {
                }}
                    className="full"
                    style={{ maxHeight: "400px", minHeight: "50px", height:"50vw"}}
                />
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