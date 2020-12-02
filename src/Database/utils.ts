// UTILS used in the various tools
export const RELATEDTABS = [
    'Related Homework',
    'Related Projects',
    'Related Exams',
    'Resources',
]


export interface Project {
    title: string;
    completion: number;
    section_weight: number;
    overall_weight: number;
    requirements: string;
    related_homework: string[];
    resources: string[];
    DateCreated: string;
}

export interface Exam {
    title: string;
    section_weight: number; 
    overall_weight: number; 
    related_hw: string[];     
    related_projs: string[];
    related_exams: string[]; 
    resources: string[];
    DateCreated: string;
}

export interface ExamData {
    class: string;
    ClassID: string;
    exams: Exam[];
}

export interface ProjectData {
    class: string;
    classID: string;
    projects: Project[];
}