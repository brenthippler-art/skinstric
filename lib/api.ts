import { UserInfo } from "./storage";

const PHASE_ONE_URL = 
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

export interface PhaseOneResponse {
    success: boolean;
    message: string;
}

export async function submitPhaseOne(userInfo: UserInfo): Promise<PhaseOneResponse> {
    const response = await fetch(PHASE_ONE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
        throw new Error(`Phase One request failed with status ${response.status}`);
    }

    return response.json();
}