// UTILS used in the various tools
export const RELATEDTABS = [
    'Related Homework',
    'Related Projects',
    'Related Exams',
    'Resources',
]

export interface Exam {
    title: string;
    section_weight: string; 
    overall_weight: string; 
    related_hw: string/* [] */;     
    related_projs: string/* [] */;
    related_exams: string/* [] */; 
    resources: string/* [] */;      
}

export interface ExamData {
    class: string;
    exams: Exam[];
}
