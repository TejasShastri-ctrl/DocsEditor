'use server';

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api"; // Adjust path to your api
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers(documentId: string) {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();

    // 1. Fetch the document to see which Org it belongs to
    const document = await convex.query(api.documents.getById, { 
        id: documentId as Id<"documents"> 
    });

    if (!document) return [];

    // 2. Determine which Org ID to use
    // If the doc belongs to an Org, use that.
    // If not, fallback to the session's Org (which might be undefined).
    const orgId = document.organizationId || sessionClaims?.org_id;

    // 3. If there is no Org ID (Personal File), return empty or just the current user
    if (!orgId) {
        return []; 
    }

    // 4. Fetch users from that specific Organization
    const response = await clerk.users.getUserList({
        organizationId: [orgId],
    });

    const users = response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl,
    }));

    return users;
}