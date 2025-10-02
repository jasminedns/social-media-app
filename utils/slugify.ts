export const slugify = (text:string) => {
    return text
        .toLowerCase()
        .trim() //gets rid of spaces
        .replace(/[^\w\s-]/g, '') 
        // ^ means it's not. 
        // [] means one of the characters in the brackets
        .replace(/[\s_]/g, '-')
        .replace(/-+/g, '-')
        // + means one or more
}