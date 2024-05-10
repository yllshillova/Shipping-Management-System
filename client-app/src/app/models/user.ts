export default interface User {
    unique_name?: string;
    nameid: string;
    email: string;
    role?: string;
    jwtToken?: string;
}