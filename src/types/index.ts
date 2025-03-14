export interface Category {
    id: string;
    name: string;
}

export interface Income {
    id: string;
    categoryId: string;
    amount: number;
    date: string;
}

export interface Expense {
    id: string;
    categoryId: string;
    amount: number;
    date: string;
}