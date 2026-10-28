import { LinkIcon } from "lucide-react";
import { useState } from "react";



const RichTextEditor = ({content = [], setPopUpPosition, setContent}) => {
    const [contentBlockIndex, setContentBlockIndex] = useState(0);
     const translateToHTML = () =>
        console.log(content);
    content.map((block, index) => {
        const isBold = block.format?.includes("bold");
        const isItalic = block.format?.includes("italic");

        let text = block.text ?? "";
        if (isItalic) text = <em>{text}</em>;
        if (isBold) text = <strong>{text}</strong>;

        return <span key={block.id ?? index}>{text}</span>;
    });
     
     const updateContent = (text = "") => {
        const tempContent = [...content];
        if (tempContent[contentBlockIndex].end_subdivision > text.length) {
            tempContent[contentBlockIndex].end_subdivision = text.length - 1;
        }
        tempContent[contentBlockIndex].text = text.substring(tempContent[contentBlockIndex].start_subdivision, tempContent[contentBlockIndex].end_subdivision);
        setContent("content", tempContent);
        console.log(content);
     }
    return (
        <>
        <div className="rich-text-editor-controls">
            <button><bold>B</bold></button>
            <button><em>I</em></button>
            <button><LinkIcon/></button>
        </div>
        <div className="grid">
            <textarea className="rich-text-editor full" onChange={(e) => {
                updateContent(e.currentTarget.value);
                const preview_rte = document.getElementById("preview-rte");
                if (preview_rte !== null) {
                    preview_rte.innerHTML = `<strong></strong>`;
                }

            }}/>
        <h3>Preview</h3>
        <div id="preview-rte"></div>
        </div>
        
        </>
    )
}
export default RichTextEditor;