import { LinkIcon } from "lucide-react";



const RichTextEditor = ({content, setPopUpPosition, setContent}) => {
     
    return (
        <>
        <div className="rich-text-editor-controls">
            <button><bold>B</bold></button>
            <button><em>I</em></button>
            <button><LinkIcon/></button>
        </div>
        <div className="rich-text-editor" contentEditable="true">
        </div>
        </>
    )
}
export default RichTextEditor;