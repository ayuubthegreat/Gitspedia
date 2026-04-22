import z from "zod";

export const articleSchema = z.object({
    title: z.string(),
    searchBlurb: z.string(),
    mainParagraph: z.string(),
    paragraphs: z.array(z.object({
        title: z.string(),
        content: z.string()
    })),
    infobox: z.object({
        imageLink: z.string().optional(),
        fields: z.array(z.object({
            key: z.string(),
            value: z.string()
        })).optional()
    }).optional(),
    tags: z.array(z.string()).optional(),
})
export const articlePrototype = {
    title: "",
    searchBlurb: "",
    mainParagraph: "",
    paragraphs: [],
    infobox: {
        imageLink: "",
        fields: []
    }
}