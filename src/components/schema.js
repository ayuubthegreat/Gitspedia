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
    titleImageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Wikipedia-logo.png/600px-Wikipedia-logo.png",
    infoboxFields: [],
    tags: [],
}
export const userPrototype = {
    username: "",
    email: "",
    password: ""
}

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required")
});
export const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters").nonempty("Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required")
});
