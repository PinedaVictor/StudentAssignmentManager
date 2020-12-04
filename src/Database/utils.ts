export interface Homework {
    title: string;
    completion: number;
    section_weight: number;
    overall_weight: number;
    requirements: string;
    resources: string[];
    DateCreated: string;
}

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
    DateDue: string;
    grade: number;
    section_weight: number; 
    overall_weight: number; 
    related_hw: string[];     
    related_projs: string[];
    related_exams: string[]; 
    resources: string[];
}

export interface HomeworkData {
    class: string;
    classID: string;
    homeworks: Homework[];
}

export interface ProjectData {
    class: string;
    classID: string;
    projects: Project[];
}

export interface ExamData {
    class: string;
    ClassID: string;
    exams: Exam[];
}