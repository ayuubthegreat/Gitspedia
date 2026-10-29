import { ImageIcon, LinkIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { articleContentSchema } from "../store/slices/articlesSlice";



const RichTextEditor = ({get, setPopUpPosition, set}) => {
    // React states
    const [contentText, setContentText] = useState("");
    const [contentIndex, setContentIndex] = useState(0);
    const [isBoldText, setIsBoldText] = useState(false);
    const [isItalicText, setIsItalicText] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const onKeyDown = (event) => {
        const richTextEditor = document.getElementById("rich-text-editor");
        let newContentText = contentText;
        if (event.key === "Backspace") {
            newContentText = newContentText.substring(0, newContentText.length - 1);
        } else if (event.key === "Space") {
            newContentText += " ";
        } else {
            newContentText += event.key;
        }
        const tempContent = [...get("content")];
        tempContent[contentIndex].text = newContentText;
        setContentText(newContentText);
        set("content", tempContent);
        richTextEditor.innerHTML = translateToHTML();
    }
    const translateToHTML = () => {
        return `<p>${contentText}</p>`
    }

    return (
        <>
        <div id="rich-text-controls">
            <button onClick={() => {
                setIsBoldText(!isBoldText);
                if (isBoldText) {
                    
                }
            }}><strong>B</strong></button>
            <button onClick={() => {
                setIsItalicText(!isItalicText);
            }}><em>I</em></button>
            <button><LinkIcon/></button>
            <button><ImageIcon/></button>
        </div>
        <div id="rich-text-editor" onKeyDown={onKeyDown} contentEditable="true" />
        </>
    )
}
export default RichTextEditor;