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
    const [beganTyping, setBeganTyping] = useState(true);
    const [subsectionIndex, setSubsectionIndex] = useState(0);
    const [contentText, setContentText] = useState("");
    const [popUpPosition, setpopUpPosition] = useState(null);
    const [typeOfPopup, setTypeofPopup] = useState("");

    const createContentBlock = (start = 0, link = "", text = "") => ({
    ...articleContentSchema,
    format: [],
    start_of_subdivision: start,
    end_of_subdivision: -1,
});

const addNewContentBlock = () => {
    const blocks = [...getValues("content")];
    const newBlock = createContentBlock(contentText.length);
    setCurrentBlockIndex(currentBlockIndex + 1);
    if (isBoldTextEnabled) newBlock.format.push("bold");
    if (isItalicTextEnabled) newBlock.format.push("italic");
    setBeganTyping(true);
    blocks.push(newBlock);
    setValue("content", blocks);
};
    const scanForContentChange = (text) => {
        setContentText(text);
       let blocks = [...getValues("content")];
       console.log("Blocks length: ", blocks.length);
       let index = currentBlockIndex;
       if (currentBlockIndex >= blocks.length) {
        index = blocks.length - 1;
        setCurrentBlockIndex(index);
       }
       blocks[index].text = contentText.substring(blocks[index].start_of_subdivision);
       blocks[index].end_of_subdivision = contentText.length;
       for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === null)
            continue;
            if (blocks[i].end_of_subdivision > contentText.length) {
               blocks[i].end_of_subdivision = contentText.length;
            }
            if (blocks[i].start_of_subdivision > contentText.length) {
                blocks = blocks.filter((val) => val !== blocks[i]);
            }
       }
       setValue("content", blocks);
       console.log(blocks);
    }
    const convertContentToHTML = () => {
        const blocks = [...getValues("content")];
        return blocks.map((block, index) => {
            const includesBold = block.format.includes("bold");
            const includesItalic = block.format.includes("italic");
            if (includesBold && includesItalic) {
                return <p><strong><em>{block.text}</em></strong></p>
            }
            if (includesBold) {
                return <p><strong>{block.text}</strong></p>
            }
            if (includesItalic) {
                return <p><em>{block.text}</em></p>
            }
            
            
            return <p>{block.text}</p>
        });
    }
    const enablePopup = (e, text) => {
        setpopUpPosition({
            x: e.clientX,
            y: e.clientY
        })
        console.log(popUpPosition);
        setTypeofPopup(text);
    }
    const renderPopupGraphics = () => {
        if (typeOfPopup === "link") {
            return (<>
            <label>URL</label>
            <input placeholder="Enter Link URL"></input>
            <label>Name</label>
            <input placeholder="Enter Link Name"></input>
            </>)
        }
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
                    }
                }} id="bold-btn"><strong>B</strong></button>
                <button onClick={() => {
                      const italicBtn = document.getElementById("italic-btn");
                    if (italicBtn !== null) {
                        setIsItalicTextEnabled(!isItalicTextEnabled);
                        italicBtn.classList.toggle('selected');
                        setBeganTyping(false);
                    }
                }} id="italic-btn"><em>I</em></button>
                <button onClick={(e) => {
                    enablePopup(e, "link");
                }} id="add-link-btn"><LinkIcon/></button>
                <button id="add-image-btn"><ImageIcon/></button>
                <button>See HTML</button>
            </div>
            <div className="text-editor">
                <textarea onChange={(e) => {
                    if (!beganTyping) {
                        addNewContentBlock();
                    }
                    scanForContentChange(e.currentTarget.value);
                }}
                    className="full"
                    style={{ maxHeight: "400px", minHeight: "50px", height:"50vw"}}
                />
            </div>
            {convertContentToHTML()}
        </div>
    </>), (<>
    
    </>)]
    
    const onSubmit = (data) => {
        console.log(data);
    }
    const onPopupSubmit = () => {
        if (typeOfPopup === "link") {
            const urlInput = document.getElementById('url-input');
            const urlName = document.getElementById('url-name');
            if (urlInput !== null && urlName !== null) {
                createContentBlock(0, urlInput.value, urlName.value);
            }
        }
        setTypeofPopup("");
        setpopUpPosition(null);
    
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