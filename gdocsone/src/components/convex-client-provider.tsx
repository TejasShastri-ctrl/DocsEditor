"use client";
import React from 'react'


import { ConvexProvider, ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ReactNode } from "react";

import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkProvider, useAuth, SignIn } from '@clerk/nextjs' //maybe clerk-react is available by default when you install next next for clerk
import { FullScreenLoader } from './fullscreen-loader';
// ts way too confusing, but it works so IDGAF

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
        <ConvexProviderWithClerk 
            useAuth={useAuth} 
            client={convex}
        >
            <Authenticated>
                {children}    
            </Authenticated>
            <Unauthenticated>
                <div className='flex flex-col items-center justify-center min-h-screen'>
                    <SignIn routing='hash' />
                </div>
                <p>Lock in and Log in</p>
            </Unauthenticated>
            <AuthLoading>
                <FullScreenLoader label='Auth Loading' />
                <p>Loading Authentication</p>
            </AuthLoading>
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}