export interface UserInfo {
    name: string;
    location: string;
}

const USER_INFO_KEY = "skinstric_user_info";

export function saveUserInfo(userInfo: UserInfo): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(USER_INFO_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as UserInfo;
    } catch {
        return null;
    }
}