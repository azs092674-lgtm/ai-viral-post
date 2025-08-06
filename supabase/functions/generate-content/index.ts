import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { topic } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sen viral içerik uzmanısın. Verilen konuya göre Türkçe hashtag'ler ve açıklama oluştur. Hashtag'ler popüler ve trending olmalı. Açıklama maksimum 200 karakter olmalı ve emoji içermeli.`
          },
          {
            role: 'user',
            content: `Konu: ${topic}\n\nBu konu için viral hashtag'ler ve çekici bir açıklama oluştur.`
          }
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the content to extract hashtags and description
    const lines = content.split('\n').filter((line: string) => line.trim())
    
    const hashtags = lines
      .filter((line: string) => line.includes('#'))
      .join(' ')
      .split('#')
      .filter((tag: string) => tag.trim())
      .map((tag: string) => '#' + tag.trim().split(' ')[0])
      .slice(0, 15)

    const description = lines
      .filter((line: string) => !line.includes('#') && line.length > 10)
      .join(' ')
      .substring(0, 200)

    return new Response(
      JSON.stringify({ hashtags, description }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})