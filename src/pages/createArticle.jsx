import { useForm } from "react-hook-form"
import { articlePrototype } from "../components/schema"
import { useDispatch } from "react-redux";
import { CreateArticle, UpdateArticle } from "../store/slices/articlesSlice";
import "./createArticle.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateArticlePage = ({isEditing = false, articleData = null }) => {
    
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: {errors}
    } = useForm({
        defaultValues: isEditing && articleData ? articleData : articlePrototype
    })
    // Paragraph data
    const [paragraphIndex, setParagraphIndex] = useState(-1);
    const [paragraphData, setParagraphData] = useState(getValues("paragraphs") || []);
    // Infobox data
    const [infoboxIndex, setInfoboxIndex] = useState(-1);
    const [infoboxData, setInfoboxData] = useState(getValues("infoboxFields") || []);
    // Tag data
    const [tagData, setTagData] = useState(getValues("tags") || []);
    const [tagIndex, setTagIndex] = useState(-1);
    // Windows
    const [showParagraphWindow, setShowParagraphWindow] = useState(false);
    const [showInfoboxFieldWindow, setShowInfoboxFieldWindow] = useState(false);
    const [showTagWindow, setShowTagWindow] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
        if (isEditing && articleData) {
            data.id = articleData.id;
            dispatch(UpdateArticle({articleData: data})).unwrap()
        } else {
            dispatch(CreateArticle({articleData: data})).unwrap()
        }
        if (isEditing) {
            nav(`/articles/${articleData.id}`);
        } else {
            nav("/articles");
        }
    }
    const SetDefaultValuesParagraphs = (index) => {
        const paragraph = paragraphData[index];
        const paragraphTitleInput = document.getElementById("paragraph-title-input");
        const paragraphContentInput = document.getElementById("paragraph-content-input");
        if (paragraphTitleInput && paragraphContentInput) {
            paragraphTitleInput.value = paragraph.title;
            paragraphContentInput.value = paragraph.content;
        }
    }
    const SetDefaultValuesInfoboxFields = (index) => {
        const field = infoboxData[index];
        const infoboxFieldKeyInput = document.getElementById("infobox-field-key-input");
        const infoboxFieldValueInput = document.getElementById("infobox-field-value-input");
        if (infoboxFieldKeyInput && infoboxFieldValueInput) {
            infoboxFieldKeyInput.value = field.key;
            infoboxFieldValueInput.value = field.value;
        }
    }
    const SetDefaultValuesTag = (index) => {
        const tag = tagData[index];
        const tagInput = document.getElementById("tag-input");
        if (tagInput) {
            tagInput.value = tag;
        }
    }
    const CreateParagraphWindow = () => {
        const isEdit = paragraphIndex !== -1;
        const newParagraph = {
                title: isEdit ? paragraphData[paragraphIndex].title : "idididjkdj",
                content: isEdit ? paragraphData[paragraphIndex].content : "alkldkld"
            }
        const handleCreateParagraph = () => {
            const values = getValues();
            
            if (isEdit) {
                values.paragraphs[paragraphIndex] = newParagraph;
            } else {
                values.paragraphs.push(newParagraph);
            }
            setValue("paragraphs", values.paragraphs);
            setParagraphData(values.paragraphs);
            setParagraphIndex(-1);
            setShowParagraphWindow(false);
        }
        return (
            <div className="backdrop">
                <div className="paragraph-creation-box">
                <button className="close-button" onClick={() => {setShowParagraphWindow(false); setParagraphIndex(-1)}}>X</button>
                <input placeholder="Paragraph Title" onChange={(e) => newParagraph.title = e.target.value} id="paragraph-title-input" />
                <textarea placeholder="Paragraph Content" onChange={(e) => newParagraph.content = e.target.value} id="paragraph-content-input" />
                <button type="button" onClick={handleCreateParagraph}>
                    {isEdit ? "Edit Paragraph" : "Create Paragraph"}
                </button>
            </div>
            </div>
        )
    }
    const CreateInfoboxFieldWindow = () => {
        const isEdit = infoboxIndex !== -1;
        const newInfoboxField = {
                key: isEdit ? infoboxData[infoboxIndex].key : "idididjkdj",
                value: isEdit ? infoboxData[infoboxIndex].value : "alkldkld"
            }
        const handleCreateInfoboxField = () => {
            const values = getValues();
            console.log(values)
            if (isEdit) {
                values.infoboxFields[infoboxIndex] = newInfoboxField;
            } else {
                values.infoboxFields.push(newInfoboxField);
            }
            setValue("infoboxFields", values.infoboxFields);
            setInfoboxData(values.infoboxFields);
            setInfoboxIndex(-1);
            setShowInfoboxFieldWindow(false);
        }
        return (
            <div className="backdrop">
                <div className="infobox-field-creation-box">
                <button className="close-button" onClick={() => {setShowInfoboxFieldWindow(false); setInfoboxIndex(-1)}}>X</button>
                <input placeholder="Infobox Field Key" onChange={(e) => newInfoboxField.key = e.target.value} id="infobox-field-key-input" />
                <input placeholder="Infobox Field Value" onChange={(e) => newInfoboxField.value = e.target.value} id="infobox-field-value-input" />
                <button type="button" onClick={handleCreateInfoboxField}>
                    {isEdit ? "Edit Infobox Field" : "Create Infobox Field"}
                </button>
            </div>
            </div>
        )
    }
    const CreateTagWindow = () => {
        const isEdit = tagIndex !== -1;
        let newTag = isEdit ? tagData[tagIndex] : "";
        const handleCreateTag = () => {
            const values = getValues();
            console.log(values)
            if (isEdit) {
                values.tags[tagIndex] = newTag;
            } else {
                values.tags.push(newTag);
            }
            setValue("tags", values.tags);
            setTagData(values.tags);
            setTagIndex(-1);
            setShowTagWindow(false);
        }
        return (
            <>
            <div className="backdrop">
                <div className="tag-creation-box">
                <button className="close-button" onClick={() => {setShowTagWindow(false); setTagIndex(-1)}}>X</button>
                <input placeholder="Tag" onChange={(e) => newTag = e.target.value} id="tag-input" />
                <button type="button" onClick={handleCreateTag}>
                    {isEdit ? "Edit Tag" : "Create Tag"}
                </button>
                </div>
            </div>
            </>
        )
    }
    return (
        <>
        {showParagraphWindow && <CreateParagraphWindow />}
        {showInfoboxFieldWindow && <CreateInfoboxFieldWindow />}
        {showTagWindow && <CreateTagWindow />}
        <h1 className="editor-title">{isEditing ? "Edit Article" : "Create Article"}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="article-creation-form">
            <div className="input-group">
            <h3>Core Details</h3>
            <input {...register("title", {required: "Title is required"})} placeholder="Title"/>
            {errors.title && <p>{errors.title.message}</p>}
            <input {...register("searchBlurb", {required: "Search Blurb is required"})} placeholder="Search Blurb"/>
            {errors.searchBlurb && <p>{errors.searchBlurb.message}</p>}
            <textarea className="main-paragraph-textarea" {...register("mainParagraph", {required: "Main Paragraph is required"})} placeholder="Main Paragraph"/>
            {errors.mainParagraph && <p>{errors.mainParagraph.message}</p>}
            </div>
            <div className="input-group">
            <h3>Paragraphs</h3>
            <div className="paragraph-creation-box">
                <button type="button" onClick={() => setShowParagraphWindow(true)}>Create Paragraph</button>
                {paragraphData.length > 0 ? paragraphData.map((paragraph, index) => {
                    return (
                        <div key={index} className="paragraph-edit-box">
                            <button type="button" onClick={() => {
                                setTimeout(() => {
                                SetDefaultValuesParagraphs(index);
                                }, 200);
                                setParagraphIndex(index);
                                setShowParagraphWindow(true);
                            }}>Edit</button>
                            <button type="button" onClick={() => {
                                const updatedParagraphs = paragraphData.filter((val, idx) => idx !== index);
                                setParagraphData(updatedParagraphs);
                                setValue("paragraphs", updatedParagraphs);
                            }}>Delete</button>
                            <h4>{`Paragraph ${index + 1}`}: {paragraph.title}</h4>
                            <p>{paragraph.content}</p>
                        </div>
                    )
                }) : <p>No paragraphs added.</p>}
            </div>
            {errors.paragraphs && <p>{errors.paragraphs.message}</p>}
            </div>
            <div className="input-group">
            <h3>Infobox</h3>
            <input {...register("titleImageLink")} placeholder="Infobox Image Link"/>
            <div className="infobox-creation-box">
                
               <button type="button" onClick={() => {setShowInfoboxFieldWindow(true)}}>Create Infobox Field</button>
               {infoboxData.length > 0 ? infoboxData.map((field, index) => {
                return (
                    <div key={index} className="infobox-field-edit-box">
                        <button type="button" onClick={() => {
                            setTimeout(() => {
                                SetDefaultValuesInfoboxFields(index);
                            }, 200);
                            setShowInfoboxFieldWindow(true);
                            setInfoboxIndex(index);
                        }}>Edit</button>
                        <button type="button" onClick={() => {
                            const updatedInfobox = infoboxData.filter((val, idx) => idx !== index);
                            setInfoboxData(updatedInfobox);
                            setValue("infoboxFields", updatedInfobox);
                        }}>Delete</button>
                        <h4>{`Infobox Field ${index + 1}`}: {field.key}</h4>
                        <p>{field.value}</p>
                    </div>
                )
               }) : <p>No infobox fields added.</p>}
               <button type="submit">{isEditing ? "Save Changes" : "Create Article"}</button>
               </div>
               </div>
               <div className="input-group">
            <h3>Tags</h3>
            <div className="tags-input-container">
                <button type="button" onClick={() => setShowTagWindow(true)}>Create Tag</button>
                {tagData.length > 0 ? tagData.map((tag, index) => {
                    return (
                        <div key={index} className="tag-edit-box">
                            <button type="button" onClick={() => {
                                setTimeout(() => {
                                    SetDefaultValuesTag(index);
                                }, 200);
                                setShowTagWindow(true);
                                setTagIndex(index);
                            }}>Edit</button>
                            <button type="button" onClick={() => {
                                const updatedTags = tagData.filter((val, idx) => idx !== index);
                                setTagData(updatedTags);
                                setValue("tags", updatedTags);
                            }}>Delete</button>
                            <p>{tag}</p>
                        </div>
                    )
                }) : <p>No tags added.</p>}
            </div>
            {errors.tags && <p>{errors.tags.message}</p>}
                </div>
        
        </form>
        </>
    )
}