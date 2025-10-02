import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (request:NextRequest) => {
    let supabaseResponse = NextResponse.next()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))

                    cookiesToSet.forEach(({name, value, options}) => supabaseResponse.cookies.set(name, value, options))
                }
            }
        }
    )
    
    //checks if a user exists
    const {data: {user}, error} = await supabase.auth.getUser()

    //array of protective roots. $ is the end of the string
    const protectedRoutes = [
        /^\/create$/
    ]

    if (!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname))) {
        //this clones the entire url and changes the pathname to the login

        const newUrl = request.nextUrl.clone()
        newUrl.pathname = '/auth/login'

        return NextResponse.redirect(newUrl)
    }
}