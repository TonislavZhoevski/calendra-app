'use server'
import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { eventFormSchema } from "@/schema/events";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

 // Marks this file as a Server Action - required for Next.js App Router

// This function creates a new event in the database after validating the input data
export async function createEvent(
  unsafeData: z.infer<typeof eventFormSchema> // Accepts raw eventt data validated by the zod schema
): Promise<void> {
  try {
    
    // Authenticate the user using Clerk
    const {userId} = await auth()
    // Validate the incoming data against the event form schema
    const { success, data } = eventFormSchema.safeParse(unsafeData)
        // If validation fails or the user is not authenticated, throw an error
    if (!success || !userId) {
      throw new Error("Invalid event data or user not authenticated.")
    }

    // Insert the validated event data into the database, linking it to the authenticated user
    db.insert(EventTable).values({...data, clerkUserId: userId})

  } catch (error: any) {
    // If any error occurs during the process, throw a new error with a readable message
    throw new Error(`Failed to create event: ${error.message || error}`)
  } finally {
    
    //Revalidate the '/events' path to ensure the page fetches fresh data after the database operation
    revalidatePath('/events')
    // Redirect the user to the '/events' page after the action completes (whether successful or not)
    redirect('/events')
  }
}