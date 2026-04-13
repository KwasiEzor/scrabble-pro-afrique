import { requireSupabase } from './supabase'

export interface SubmissionInput {
  name: string
  email: string
  subject: string
  content: string
  tag: string
  website?: string
  captchaToken: string
}

export const submissionService = {
  async submitMessage(input: SubmissionInput) {
    const client = requireSupabase()
    const { data, error } = await client.functions.invoke('submit-message', {
      body: input,
    })

    if (error) {
      throw error
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Submission failed.')
    }

    return data
  },
}
