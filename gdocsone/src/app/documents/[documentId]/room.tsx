"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";


import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {

  const params = useParams();

  return (
    <LiveblocksProvider publicApiKey={"pk_dev_eL72b5DprG5iPDVhRcFqJd3w6D9wqZTH5Fb59w8zQxG_rDK21zQTh6-g-LnlWlyu"}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}