'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/services/SupabaseClient'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface ChatItem {
  Chat_Id: string
  Title: string
}

const ChatPage = () => {
  const { user } = useUser()
  const [chats, setChats] = useState<ChatItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchChats()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from('Data')
        .select('Chat_Id, Title')
        .eq('userEmail', user?.primaryEmailAddress?.emailAddress)

      if (error) throw error
      setChats(data || [])
    } catch (error) {
      console.error('Error fetching chats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading chats...</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Your Crop Chats</h1>
      <div className="grid gap-4">
        {chats.map((chat) => (
          <Link key={chat.Chat_Id} href={`/dashboard/chat/${chat.Chat_Id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-4">
                <Image src="/favicon.png" alt="Favicon" width={32} height={32} className="mr-4" />
                <h3 className="font-semibold">{chat.Title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
        {chats.length === 0 && <p className='text-center'>No chats found. Start a new one from the dashboard.</p>}
      </div>
    </div>
  )
}

export default ChatPage
