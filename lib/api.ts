import { UserInfo } from "./storage";

const PHASE_ONE_URL = 
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

const PHASE_TWO_URL = 
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export interface PhaseOneResponse {
    success: boolean;
    message: string;
}
export interface DemographicScoreMap {
    [label: string]: number;
}

export interface PhaseTwoResponse {
    success: boolean;
    message: string;
    data: {
        race: DemographicScoreMap;
        age: DemographicScoreMap;
        gender: DemographicScoreMap;
    };
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

export async function submitPhaseTwo(base64Image: string): Promise<PhaseTwoResponse> {
    const response = await fetch(PHASE_TWO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
        throw new Error(`Phase Two request failed with status ${response.status}`);
    }

    return response.json();
}