import { articleContentSchema } from "../store/slices/articlesSlice";

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
    const newBlocks = [];
    let indexOfEnd = 0;
    for (let i = 1; i < text.length; i++) {
        if (text[i] === "|" && text[i - 1] === "|") {
            let substringedText = text.substring(i + 1);
            if (substringedText.startsWith("LINK:")) {
                indexOfEnd = substringFromSplitter(text, i);
                let newBlock = {...articleContentSchema};
                if (indexOfEnd > 0) {
                    newBlock.link = text.substring(i, indexOfEnd);
                    i = indexOfEnd;
                } else {
                    newBlock.link = text.substring(i);
                    break;
                }
                newBlocks.push(newBlock);
            } else if (substringedText.startsWith("B:")) {

            } else if (substringedText.startsWith("I:")) {

            } else {
                
            }
        }
    }
}
const substringFromSplitter = (originalText = "", startIndex = 0) => {
    let text = originalText.substring(startIndex);
    for (let i = 1; i < text.length; i++) {
        if (text[i] === "|" && text[i - 1] === "|") {
            return i;
        }
    }
    return -1;
}