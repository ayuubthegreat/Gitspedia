import { useState } from "react"

const SearchBar = ({onClick = (value) => {
    console.log("New value: " + value);
}, placeholder = "Enter here....", addClassNames=""}) => {
    const [value, setValue] = useState("");
    return (
        <>
        <div className="search-bar-parent">
            <input className="search-bar" placeholder={placeholder} onChange={(e) => {setValue(e.currentTarget.value);}}/>
            <button onClick={() => {onClick(value);}} className="search-bar-button">Submit</button>
        </div>
        </>
    )
}
export default SearchBar;