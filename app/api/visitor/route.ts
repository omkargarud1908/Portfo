import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET() {
  try {
    const totalVisitors = (await redis.get<number>("portfolio:total_visitors")) || 0
    
    return NextResponse.json({
      totalVisitors,
    })
  } catch (error) {
    console.error("Error fetching visitor count:", error)
    return NextResponse.json({ totalVisitors: 0 }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Increment total visitors
    const totalVisitors = await redis.incr("portfolio:total_visitors")
    
    return NextResponse.json({
      totalVisitors,
    })
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    return NextResponse.json({ totalVisitors: 0 }, { status: 500 })
  }
}
