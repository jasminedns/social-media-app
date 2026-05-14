import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BLOOPBOT_USER_ID = 'dc97a348-3d70-4afd-933f-82dacf83d8a4'

export async function GET(request: Request) {

    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'baidu/cobuddy:free',
            messages: [
                {
                    role: 'user',
                    content: `Write a short social media post for a platform called BLOOP. Return it in this format:

                    Title: <1 short catchy line>
                    Post: <1-2 sentence message>

                    Rules:
                        - No hashtags
                        - No emojis unless natural
                        - Must sound human and casual`
                }
            ],
            max_tokens: 120,
        }),
    })

    const data = await aiResponse.json()

    const text =
        data?.choices?.[0]?.message?.content ?? ""

    const titleMatch = text.match(/Title:\s*(.*)/i)
    const postMatch = text.match(/Post:\s*([\s\S]*)/i)

    const title = titleMatch?.[1]?.trim() ?? "Untitled post"
    const content = postMatch?.[1]?.trim() ?? text

    const slug =
        title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .trim()
            .replace(/\s+/g, '-')

    if (!aiResponse.ok) {
        const err = await aiResponse.text()
        console.error("OpenRouter HTTP error:", err)

        return NextResponse.json(
            { error: "OpenRouter request failed", details: err },
            { status: 500 }
        )
    }

    const { error } = await supabase
        .from('post')
        .insert({
            user_id: BLOOPBOT_USER_ID,
            title: title,
            content: content,
            slug: slug
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, post: title, text: content })
}