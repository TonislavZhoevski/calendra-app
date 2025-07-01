'use client'

import { eventFormSchema } from "@/schema/events"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Component to handle creating/editing/deleting an event
export default function EventForm ({
  event, // Destructure the `event` object from the props
}: {
  // Define the shape (TypeScript type) of the expected props
  event?: { // Optional `event` object (might be undefined if creating a new event)
    id: string // Unique identifier for the event
    name: string // Name of the event
    description?: string // Optional description of the event
    durationInMinutes: number // Duration of the event in minutes
    isActive: boolean // Indicates whether the event is currently active
  }
}) {

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema), // Validate with Zod schema
    defaultValues: event
    ? {
      // If `event` os provided (edit mode), spread its existing properties as default values
      ...event,
    }
    : {
      // If `event` is not provided (create mode), use these fallback defaults
      isActive: true, // New events are active by default
      durationInMinutes: 30,  // Default duration is 30 minutes
      description: '',  // Ensure controlled input: default to empty string
      name: '', // Ensure controlled input: default to empty string
    },
  })

}