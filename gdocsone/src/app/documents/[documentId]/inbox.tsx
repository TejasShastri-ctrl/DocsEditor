"use client"


import { Button } from "@/components/ui/button"
import { ClientSideSuspense } from "@liveblocks/react"

import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { BellPlusIcon } from "lucide-react"

export const Inbox = () => {
    return (
        <ClientSideSuspense fallback={<p>Loading Notifications</p>}>
            <InboxMenu />
        </ClientSideSuspense>
    )
}


const InboxMenu = () => {

    // needs to be a suspense import
    const {inboxNotifications} = useInboxNotifications();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" className="relative" size={"icon"}> 
                    <BellPlusIcon className="size-5" />
                    {inboxNotifications.length>0 && (
                        <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
                            {inboxNotifications.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
                {inboxNotifications.length>0 ? (
                    <InboxNotificationList>

                    </InboxNotificationList>
                ) : (
                    <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">

                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}