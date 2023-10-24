import { adminDb } from "@/firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { chatId, memberToDeleteId } = await req.json();

  const chatRef = adminDb.collection("chats").doc(chatId);
  const memberRef = chatRef.collection("members").doc(memberToDeleteId);

  console.log(memberRef.id);

  const bulkWriter = adminDb.bulkWriter();

  const MAX_RETRY_ATTEMPTS = 5;

  bulkWriter.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    } else {
      console.log("Failed write at document: ", error.documentRef.path);
      return false;
    }
  });

  try {
    // Delete the member document from the "members" subcollection of the chat
    await adminDb.recursiveDelete(memberRef, bulkWriter);

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Promise rejected: ", error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
