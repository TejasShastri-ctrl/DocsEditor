import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { api } from '../../../../convex/_generated/api';

// 1. Defensive Environment Variable Loading
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const liveblocksSecret = process.env.LIVEBLOCKS_SECRETKEY;

if (!convexUrl || !liveblocksSecret) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL or LIVEBLOCKS_SECRETKEY");
}

const convex = new ConvexHttpClient(convexUrl);
const liveblocks = new Liveblocks({
  secret: liveblocksSecret,
});

export async function POST(req: Request) {
  try {
    // 2. Authentication Check
    const { sessionClaims, userId } = await auth();
    if (!sessionClaims) {
      return new Response("Unauthorized: No session", { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized: User not found", { status: 401 });
    }

    // 3. Parse Body
    const { room } = await req.json();
    const document = await convex.query(api.documents.getById, { id: room });

    if (!document) {
      return new Response("Document not found", { status: 404 });
    }

    const isOwner = document.ownerId === user.id;


    //! //////////// Debugging area


    const client = await clerkClient();

    const memberships = await client.users.getOrganizationMembershipList({
      userId: userId,
    });
    console.log('clerk user API -> organization membership list for this user : ', { memberships });

    //! //////////// Debugging area



    // Manual membership ID confirmation.
    const isOrganizationMember = memberships.data.some(
      (mem) => mem.organization.id === document.organizationId
    );

    console.log('sessionclaims ORG ID:', sessionClaims.org_id, " document organization ID - ", document.organizationId)

    if (!isOwner && !isOrganizationMember) {
      return new Response("Unauthorized: You do not have access to this room", { status: 403 });
    }






    console.log('liveblocks debugging : ', { isOwner, isOrganizationMember })

    // 7. Liveblocks Session
    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.fullName ?? "Anonymous",
        avatar: user.imageUrl,
      },
    });

    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();

    return new Response(body, { status });

  } catch (error) {
    console.error("LIVEBLOCKS AUTH ERROR:", error);
    return new Response(`${error}`, { status: 500 });
  }
}