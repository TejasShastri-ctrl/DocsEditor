"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";


import { useParams } from "next/navigation";


import { LOADER_MESSAGES } from "./message-loader";
import { useMemo } from "react";
import { FullScreenLoader } from "@/components/fullscreen-loader";





export function getRandomLoaderMessage() {
  const idx = Math.floor(Math.random() * LOADER_MESSAGES.length);
  return LOADER_MESSAGES[idx];
}

const message = getRandomLoaderMessage();



export function Room({ children }: { children: ReactNode }) {

  const params = useParams();
  
  console.log("DEBUG: Current URL ID is:", params.documentId);


  return (
    <LiveblocksProvider 
    throttle={16} 
      authEndpoint="/api/liveblocks-auth"
      >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label={message}/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}