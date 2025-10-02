import { createClient } from "./server-client";
import {v4 as uuid} from "uuid";

const uploadImage = async (image:File) => {
    const supabase = await createClient();

    const imageName = image.name.split(".")
    const path = `${imageName[0]}-${uuid()}.${imageName[1]}`

    const { data, error } = await supabase.storage
        .from("images")
        .upload(path, image);


    if (error) throw error

    const {data: {publicUrl}} = supabase.storage
        .from("images")
        .getPublicUrl(data.path)

    return publicUrl
}

export default uploadImage;