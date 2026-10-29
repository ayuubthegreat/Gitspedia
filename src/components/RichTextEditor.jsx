import { ImageIcon, LinkIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { articleContentSchema } from "../store/slices/articlesSlice";



const RichTextEditor = ({get, setPopUpPosition, set, register}) => {
    // React states

    return (
        <>
        <div id="rich-text-controls">
            <button>Documentation</button>
        </div>
        <textarea className="full"  {...register("content")} id="rich-text-editor" onChange={(e) => {
            set("content", e.currentTarget.value);
        }}/>
        </>
    )
}
export default RichTextEditor;