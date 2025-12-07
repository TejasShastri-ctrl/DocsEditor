import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values'

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        initialContent: v.optional(v.string()), //for the case the user chooses a blank doc
        ownerId: v.string(),
        roomId: v.optional(v.string()),
        organizationId: v.optional(v.string())
    })
        .index("by_owner_id", ["ownerId"])
        .index("by_organization_id", ["organizationId"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["ownerId", "organizationId"] //so the app does not go through entire DB
        })
})