export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    color: string;
    icon: string;
}

export type TodoStatus = 'todo' | 'in-progress' | 'done';

export interface Todo {
    id: string;
    task: string;
    status: TodoStatus;
    createdAt: number;
}
