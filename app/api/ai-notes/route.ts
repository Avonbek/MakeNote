import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.note.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, topic } = await request.json();
  const note = await prisma.note.create({
    data: { title, content, topic, user_id: userId },
  });
  return NextResponse.json(note);
}

export async function PUT(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, content, topic } = await request.json();
  const note = await prisma.note.update({
    where: { id, user_id: userId },
    data: { title, content, topic },
  });
  return NextResponse.json(note);
}

export async function DELETE(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  await prisma.note.delete({ where: { id, user_id: userId } });
  return NextResponse.json({ success: true });
}
