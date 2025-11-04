'use client'

import { HomePostsType } from "@/utils/supabase/queries";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const HomePosts = ({posts}:{posts:HomePostsType}) => {
const gradients = [
  "bg-linear-65 from-[#065f46] to-[#0ea5e9]",
  "bg-linear-65 from-[#1e3a8a] to-[#f59e0b]",
  "bg-linear-65 from-[#6d28d9] to-[#dc2626]",
  "bg-linear-65 from-[#0d9488] to-[#a855f7]",
  "bg-linear-65 from-[#9333ea] to-[#f43f5e]",
  "bg-linear-65 from-[#1e293b] to-[#10b981]",
  "bg-linear-65 from-[#312e81] to-[#eab308]",
  "bg-linear-65 from-[#7f1d1d] to-[#06b6d4]",
  "bg-linear-65 from-[#0f172a] to-[#f97316]",
  "bg-linear-65 from-[#15803d] to-[#ec4899]",
  "bg-linear-65 from-[#3b82f6] to-[#f43f5e]",
  "bg-linear-65 from-[#16a34a] to-[#8b5cf6]",
  "bg-linear-65 from-[#2563eb] to-[#facc15]",
  "bg-linear-65 from-[#ef4444] to-[#14b8a6]",
  "bg-linear-65 from-[#7c3aed] to-[#f59e0b]",
  "bg-linear-65 from-[#0e7490] to-[#d97706]",
  "bg-linear-65 from-[#047857] to-[#ef4444]",
  "bg-linear-65 from-[#4338ca] to-[#22c55e]",
  "bg-linear-65 from-[#1e40af] to-[#f472b6]",
  "bg-linear-65 from-[#9d174d] to-[#14b8a6]"
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