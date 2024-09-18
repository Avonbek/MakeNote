// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs";

// export async function GET(request: Request) {
//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const notes = await prisma.note.findMany({
//     where: { userId: userId },
//   });
//   return NextResponse.json(notes);
// }

// export async function POST(request: Request) {
//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { title, content, topic } = await request.json();
//   const note = await prisma.note.create({
//     data: { title, content, topic, userId },
//   });
//   return NextResponse.json(note);
// }

// export async function PUT(request: Request) {
//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { id, title, content, topic } = await request.json();
//   const note = await prisma.note.update({
//     where: { id, userId },
//     data: { title, content, topic },
//   });
//   return NextResponse.json(note);
// }

// export async function DELETE(request: Request) {
//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { id } = await request.json();
//   await prisma.note.delete({ where: { id, userId } });
//   return NextResponse.json({ success: true });
// }
