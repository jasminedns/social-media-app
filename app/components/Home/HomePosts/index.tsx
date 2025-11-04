'use client'

import { HomePostsType } from "@/utils/supabase/queries";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const HomePosts = ({posts}:{posts:HomePostsType}) => {
    const gradients = [
        "bg-linear-65 from-[#1e3a8a] to-[#ea580c]", 
        "bg-linear-65 from-[#0f172a] to-[#0d9488]", 
        "bg-linear-65 from-[#4c1d95] to-[#be185d]", 
        "bg-linear-65 from-[#1e293b] to-[#06b6d4]"
    ];

    const GetRandomGradient = () => {
        const randomColour = Math.floor(Math.random() * gradients.length);
        return gradients[randomColour];
    }
    return (
        <div className="md:flex md:flex-wrap justify-end">
            { posts && posts.map(({id, slug, title, users, image, created_at}) =>
            <div key={id} className={`m-3 rounded-2xl border-1 md:w-[70%]`}>
                <Link href={`/${slug}`} className="block m-4 p-3">
                <div className="flex items-center gap-x-7">
                    <div className={`${GetRandomGradient()} p-7 flex items-center justify-center h-3 w-3 rounded-full text-white uppercase`}>{users.username[0]}</div>
                    <div>
                        <p className="text-xl font-bold">{users.username}</p>
                        <p className="text-sm text-[#cececea0]">{formatDistanceToNow(new Date(created_at), {addSuffix: true})}</p>
                    </div>
                </div>
                    <h2 className="font-bold text-center m-3">{title}</h2>
                </Link>
                {image !== null &&
                    <div className="md:m-4 p-3 mx-auto">
                        <img src={image} alt={`${image} ${title}`} className="rounded w-[70%] h-auto mx-auto"/>
                    </div>
                }
            </div>
            )}
        </div>
    )
}

export default HomePosts;