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
          richTextEditor.textContent = "";
        let newContentText = contentText;
        if (event.key === "Backspace") {
            newContentText = newContentText.substring(0, newContentText.length - 1);
        } else if (event.key === "Space") {
            newContentText += " ";
        } else {
            newContentText += event.key;
        }
        const tempContent = [...get("content")];
        tempContent[contentIndex].subdivision_end++;
        tempContent[contentIndex].text = newContentText.substring(tempContent[contentIndex].subdivision_start, tempContent[contentIndex].subdivision_end);
        setContentText(newContentText);
        richTextEditor.innerHTML = `<p>${translateToHTML()}</p>`
        set("content", tempContent);
    }
    const translateToHTML = () => {
       return [...get("content")].map((val, i) => {
            const isBold = val.format.includes("bold");
            const isItalic = val.format.includes("italic");
            if (isBold && isItalic) {
                return `<strong><em>${val.text}</em></strong>`
            }
            if (isBold) {
                return `<strong>${val.text}</strong>`
            }
            if (isItalic) {
                return `<em>${val.text}</em>`
            }
            return `${val.text}`
        })
    }
    const addContentBlock = (add_lParameters) => {
        const newContentBlock = {
            ...articleContentSchema,
            ...add_lParameters
        }
        const tempBlocks = [...get("content")];
        tempBlocks[contentIndex].subdivision_end = contentText.length;
        tempBlocks.push(newContentBlock);
        tempBlocks[contentIndex + 1].subdivision_start = contentText.length;
        set("content", [...tempBlocks, newContentBlock]);
        setContentIndex(contentIndex + 1);
    }

    return (
        <>
        <div id="rich-text-controls">
            <button id="bold-btn" onClick={() => {
                setIsBoldText(!isBoldText);
                const button = document.getElementById("bold-btn");
                button.classList.toggle("selected");
                addContentBlock({format: ["bold"]});

            }}><strong >B</strong></button>
            <button id="italic-btn" onClick={() => {
                setIsItalicText(!isItalicText);
                const button = document.getElementById("italic-btn");
                button.classList.toggle("selected");
                addContentBlock({format: ["italic"]});
            }}><em>I</em></button>
            <button><LinkIcon/></button>
            <button><ImageIcon/></button>
        </div>
        <div id="rich-text-editor" onKeyDown={onKeyDown} contentEditable="true" />
        </>
    )
}
export default RichTextEditor;