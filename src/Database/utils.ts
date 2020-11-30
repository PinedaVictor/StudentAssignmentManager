// UTILS used in the various tools
export const RELATEDTABS = [
    'Related Homework',
    'Related Projects',
    'Related Exams',
    'Resources',
]


// TODO remove Exam interfaces since they're back in the ExamsTools.tsx file
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
    exams: Exam[];
    ClassID: string;
}

export interface ProjectData {
    class: string;
    classID: string;
    projects: Project[];
}