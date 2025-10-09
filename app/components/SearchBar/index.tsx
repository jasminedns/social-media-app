'use client'

import { getSearchPosts } from "@/utils/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const SearchBar = () => {

    const [userInput, setUserInput] = useState<string>("")
    const {data} = useQuery({
        queryKey: ['search-results', userInput],
        queryFn: async () => {
            const {data, error} = await getSearchPosts(userInput);

            if(error) throw error
            return data
        },
        enabled: userInput && userInput.length > 0 ? true : false
    })

    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setUserInput(e.target.value)
    }
    
    return (
        <div className="relative m-3">
            <div className="flex items-center">
                <Search size={16}/>
                <input 
                    className="border-1 rounded-2xl p-1 md:p-2 mx-2" 
                    placeholder="Search by post title" 
                    name="Search"
                    value={userInput}
                    onChange={handleChange}
                />
            </div>
            { data &&
                <div 
                    onClick={() => setUserInput('')}
                    className="absolute w-full top-12 mx-2 right-0 bg-white text-[#5865f2] font-bold p-1 rounded-2xl">
                    {data.map(({title, slug}) =>
                        <Link 
                            key={slug}
                            href={`/${slug}`} 
                            className="block p-2 hover:text-[#c7c8c8] rounded-2xl"
                        >
                            {title}
                        </Link>
                    )}
                </div>
            }
        </div>
    )
}

export default SearchBar