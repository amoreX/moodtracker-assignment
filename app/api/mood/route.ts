import { type NextRequest, NextResponse } from "next/server"
import { getMoodEntries, addMoodEntry } from "@/lib/moods"

export const GET =async(req:any)=> {
  try {
    const entries = getMoodEntries()
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export const POST=async(req:any)=> {
  try {
    const { mood, comment } = await req.json();

    if (!mood || !["happy", "neutral", "sad"].includes(mood)) {
      return NextResponse.json({ error: "Invalid mood value" }, { status: 400 })
    }

    const newEntry = addMoodEntry(mood, comment)
    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
