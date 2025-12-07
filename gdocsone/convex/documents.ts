import { paginationOptsValidator } from "convex/server";
import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";




//! Pre orgID implementation incase it breaks
// export const get = query({
//     args: {paginationOpts: paginationOptsValidator, search: v.optional(v.string())},
//     handler: async (ctx, {search, paginationOpts}) => {
//         const user = await ctx.auth.getUserIdentity();
//         if(!user) {
//             throw new ConvexError("Unauthorized");
//         }

//         // The log can be seen in convex logs(the normal console too now I guess)
//         console.log({user});

//         if(search) {
//             return await ctx.db.query("documents")
//             .withSearchIndex("search_title", (q) => q.search("title", search)
//             .eq("ownerId", user.subject))
//             .paginate(paginationOpts)
//         }

//         return await ctx.db.query("documents").withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject)).paginate(paginationOpts);
//     }
// }) //6:52


export const get = query({
    args: {paginationOpts: paginationOptsValidator, search: v.optional(v.string())},
    handler: async (ctx, {search, paginationOpts}) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user) {
            throw new ConvexError("Unauthorized");
        }
        // The log can be seen in convex logs(the normal console too now I guess)
        console.log({user});

        //custom claims defined in Convex do not have defined types, which orgID is.
        const organizationId = (user.organization_id ?? undefined) as string | undefined;

        console.log('Running Org Search query')
        if(search && organizationId) {
            return await ctx.db.query("documents")
                .withSearchIndex("search_title", (q) => {
                    return q.search("title", search).eq("organizationId", organizationId);
                })
        }

        
        console.log('running individual search query')
        if(search) {
            return await ctx.db.query("documents")
            .withSearchIndex("search_title", (q) => q.search("title", search)
            .eq("ownerId", user.subject))
            .paginate(paginationOpts)
        }

        // All org docs
        if(organizationId) {
            return await ctx.db.query("documents").withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId)).paginate(paginationOpts);
        }

        // All personal docs
        return await ctx.db.query("documents").withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject)).paginate(paginationOpts);
    }
})




// Authorizing with clerk and convex here instead of outside
export const create = mutation({
    args: {title: v.optional(v.string()), initialContent: v.optional(v.string())},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();;

        if(!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined;

        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Document",
            ownerId: user.subject,
            organizationId,
            initialContent: args.initialContent,
        });

        return documentId;
    },
})



export const removeById = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user) {
            throw new ConvexError("Unauthorized Access");
        }

        const document = await ctx.db.get(args.id);

        if(!document) {
            throw new ConvexError("Doc not found")
        }

        const isOwner = document.ownerId === user.subject;
        const organizationId = (user.organization_id ?? undefined) as string | undefined;

        const isOrgMember = document.organizationId === organizationId;

        if(!isOwner) { //should I keep it this way?
            throw new ConvexError("Unauthorized - access denied");
        }

        return await ctx.db.delete(args.id);
    }
})

export const updateById = mutation({
    args: {id: v.id("documents"), title: v.string()},
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user) {
            throw new ConvexError("Unauthorized");
        }

        const document = await ctx.db.get(args.id);

        if(!document) {
            throw new ConvexError("Doc not found")
        }

        const isOwner = document.ownerId === user.subject;

        if(!isOwner) {
            throw new ConvexError("Unauthorized - access denied");
        }

        return await ctx.db.patch(args.id, {title: args.title});
    }
})

export const rename = mutation({
    args: {id: v.id("documents"), title: v.string()},
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user) {
            throw new ConvexError("Unauthorized");
        }

        const document = await ctx.db.get(args.id);

        if(!document) {
            throw new ConvexError("Doc not found")
        }

        const isOwner = document.ownerId === user.subject;
        const organizationId = (user.organization_id ?? undefined) as string | undefined;

        const isOrgMember = document.organizationId === organizationId;

        if(!isOwner && !isOrgMember) { //should I keep it this way?
            throw new ConvexError("Unauthorized - access denied");
        }

        return await ctx.db.patch(args.id, {title: args.title});
    }
})