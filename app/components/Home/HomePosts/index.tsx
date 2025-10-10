'use client'

import { HomePostsType } from "@/utils/supabase/queries";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostsType}) => {
    return (
        <div className="flex flex-wrap">
            { posts && posts.map(({id, slug, title, users, image}) =>
            <div key={id} className={`${image ? "flex flex-col md:flex-row justify-between md:items-center" : ""} m-3 rounded-2xl border-1 w-[47%]`}>
                <Link href={`/${slug}`} className="block m-4 p-3">
                    <p>By {users.username}</p>
                    <h2 className="font-bold ml-3">{title}</h2>
                </Link>
                {image !== null &&
                    <div className="w-30 md:m-4 p-3 m-auto">
                        <img src={image} alt={`${image} ${title}`} className="rounded"/>
                    </div>
                }
            </div>
            )}
        </div>
    )
}

export default HomePosts;