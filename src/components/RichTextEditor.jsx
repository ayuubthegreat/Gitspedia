import { LinkIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { articleContentSchema } from "../store/slices/articlesSlice";



const RichTextEditor = ({get, setPopUpPosition, set}) => {
    // React states
    const [contentText, setContentText] = useState("");
    const [isBoldText, setIsBoldText] = useState(false);
    const [isItalicText, setIsItalicText] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const onKeyDown = (event) => {
        let newContentText = contentText;
        if (event.key === "Backspace") {
            newContentText = newContentText.substring(0, newContentText.length - 1);
        } else if (event.key === "Space") {
            newContentText += " ";
        } else {
            newContentText += event.key;
        }
        setContentText(newContentText);
        console.log(contentText);
    }
    return (
        <>
        <div id="rich-text-editor" onKeyDown={onKeyDown} contentEditable="true"/>
        </>
    )
}
export default RichTextEditor;