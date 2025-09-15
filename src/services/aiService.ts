import { DisciplinaryIncident } from "../data/mockData";

/**
 * Generates a behavior summary based on a student's disciplinary incidents.
 * This is currently a stub and simulates an API call.
 * @param incidents - An array of disciplinary incidents for the student.
 * @returns A promise that resolves to a string containing the AI-generated summary.
 */
export const generateBehaviorSummary = async (incidents: DisciplinaryIncident[]): Promise<string> => {
    // TODO: Replace this stub with a real API call to the Gemini API (gemini-2.5-flash).
    // The prompt should be sent to a secure backend endpoint that manages the API key 
    // and communicates with the Google GenAI service.
    
    // 1. Format the incidents for the prompt
    const formattedIncidents = incidents.map(
      i => `- ${i.date}: ${i.incident} (Action: ${i.actionTaken})`
    ).join('\n');

    // 2. Construct the prompt
    const prompt = `Based on these disciplinary incidents, provide a brief, neutral summary of the student’s behavioral patterns suitable for a parent-teacher meeting. Incidents:\n\n${formattedIncidents}`;

    // For debugging purposes in the console
    console.log("--- PROMPT SENT TO GEMINI (STUBBED) ---");
    console.log(prompt);
    
    // 3. Simulate network delay for the API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 4. Return a mock summary
    const mockSummary = "The student has demonstrated a pattern of minor classroom disruptions and challenges with assignment completion and punctuality. An isolated incident of interpersonal conflict with a peer was also noted. These behaviors have been addressed through standard school procedures, including parent notifications, detention, and counseling mediation. Continued partnership between home and school is recommended to support the student's focus and positive peer interactions.";

    return mockSummary;
};
