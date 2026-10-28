import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { articleContentSchema } from "../store/slices/articlesSlice";



const RichTextEditor = ({get, setPopUpPosition, set}) => {
    // React states
    const [contentBlockIndex, setContentBlockIndex] = useState(0);
    const [contentAsHTML, setContentAsHTML] = useState(null);
    const [isBoldTextEnabled, setIsBoldTextEnabled] = useState(false);
    const [isItalicTextEnabled, setIsItalicTextEnabled] = useState(false);
    
     const translateToHTML = () =>
    get('content').map((block, index) => {
        console.log(block);
        const isBold = block.format?.includes("bold");
        const isItalic = block.format?.includes("italic");

        let text = block.text ?? "";
        if (isItalic) text = <em>{text}</em>;
        if (isBold) text = <strong>{text}</strong>;

        return <span key={block.id ?? index}>{text}</span>;
    });
    const createContentBlock = (add_lParams = {}) => {
        return {
            ...articleContentSchema,
            ...add_lParams,
        }
    }
    const addContentBlock = (parameters) => {
        const newContentBlock = createContentBlock(parameters);
        const tempArr = [...get('content'), newContentBlock];
        setContentBlockIndex(contentBlockIndex + 1);
        set("content", tempArr);
        console.log(tempArr, get('content'));
    }
     
     const updateContent = (text = "") => {
        const tempContent = [...get("content")];
        if (tempContent[contentBlockIndex].end_subdivision > text.length) {
            tempContent[contentBlockIndex].end_subdivision = text.length - 1;
        }
        tempContent[contentBlockIndex].text = text.substring(tempContent[contentBlockIndex].start_subdivision, tempContent[contentBlockIndex].end_subdivision);
        setContentAsHTML(translateToHTML());
        set("content", tempContent);
        console.log(get("content"));
     }
    return (
        <>
        <div className="rich-text-editor-controls">
            <button onClick={() => {
                setIsBoldTextEnabled(!isBoldTextEnabled);
                if (isBoldTextEnabled) {
                    addContentBlock({format: ["bold"]});
                } else {
                    addContentBlock();
                }
            }}><bold>B</bold></button>
            <button onClick={() => {
                addContentBlock({format: ["italic"]});
            }}><em>I</em></button>
            <button><LinkIcon/></button>
        </div>
        <div className="grid">
            <textarea className="rich-text-editor full" onChange={(e) => {
                updateContent(e.currentTarget.value);

            }}/>
        <h3>Preview</h3>
        <div id="preview-rte">{contentAsHTML}</div>
        </div>
        
        </>
    )
}
export default RichTextEditor;