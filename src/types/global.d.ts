declare global {
    interface User {
        id?: string;
        password?: string;
        nickname?: string;
        gem?: number;
        c_type?: string | null;
        reg_data?: string;
    }
}


export {};