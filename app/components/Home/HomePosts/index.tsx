'use client'

import { HomePostsType } from "@/utils/supabase/queries";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostsType}) => {
    return (
        <div>
            { posts && posts.map(({id, slug, title, users, image}) =>
            <div className={`${image ? "flex justify-between items-center" : ""} m-3 rounded-2xl border-1`}>
                <Link href={`/${slug}`} key={id} className="block m-4 p-3">
                    <h2 className="font-bold">{title}</h2>
                    <p>Posted by {users.username}</p>
                </Link>
                {image !== null &&
                    <div className="w-30 m-4 p-3">
                        <img src={image} alt={`${image} ${title}`} className="rounded"/>
                    </div>
                }
            </div>
            )}
        </div>
    )
}

export default HomePosts;