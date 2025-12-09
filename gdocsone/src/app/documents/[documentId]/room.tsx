"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";


import { useParams } from "next/navigation";


import { LOADER_MESSAGES } from "./message-loader";
import { useMemo } from "react";
import { FullScreenLoader } from "@/components/fullscreen-loader";
import { getUsers } from "./actions";
import { toast } from "sonner";





export function getRandomLoaderMessage() {
  const idx = Math.floor(Math.random() * LOADER_MESSAGES.length);
  return LOADER_MESSAGES[idx];
}
const message = getRandomLoaderMessage();




type User = {id: string; name:string; avatar:string};



export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        // PASS THE ID HERE
        const list = await getUsers(params.documentId as string);
        setUsers(list);
      } catch (err) {
        toast.error("Failed to fetch users");
      }
    },
    [params.documentId] // Add dependency
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  console.log('users fetched for populating comments in room.tsx- ', users)



  return (
    <LiveblocksProvider 
    throttle={16} 
      authEndpoint="/api/liveblocks-auth"
      
      resolveUsers={({userIds}) => {
        return userIds.map(
          (id) => users.find((user) => user.id === id) ?? undefined
        )
      }}
      
      
      resolveMentionSuggestions={( {text} ) => {
        let filteredUsers = users;
        if(text) {
          filteredUsers = users.filter(
            (user) => user.name?.toLowerCase().includes(text.toLowerCase())
          )
        }

        return filteredUsers.map((user) => user.id);
      }}
      
      
      resolveRoomsInfo={() => []}
      >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label={message}/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}