export const ParseText = (text= "") => {
    /*
    A text parser that parses specifically designed text.
    LIMITER: ||
    ELEMENTS AND EXAMPLES:
    Bold = ||-B:name-||
    Italic = ||I:name||
    Link = ||LINK:name;wwww.example.com||
    Image = ||IMG:btm-txt;src/img.png||
    */
    for (let i = 1; i < text.length; i++) {
        if (text[i] === "|" && text[i - 1] === "|") {
            let substringedText = text.substring(i + 1);
            if (substringedText.startsWith("LIST:")) {
                console.log("Found link");
            } else if (substringedText.startsWith("B:")) {
                console.log("Found bold text:");
            }
        }
    }
}