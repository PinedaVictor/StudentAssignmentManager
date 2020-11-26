import { ExamData, ProjectData } from './utils';
// USE THIS WHILE WE ADD THE DB BACKEND
export const ExamDataJson: ExamData[] = [
    {
        class: 'Phil 101',
        exams: [
            {
                title: 'Exam #1',
                section_weight: '10',
                overall_weight: '10',
                related_hw: [
                    'HW #1',
                ],
                related_projs: [],
                related_exams: [],
                resources: [
                    'youtube.com'
                ],
            },
            {
                title: 'Exam #2',
                section_weight: '10',
                overall_weight: '10',
                related_hw: [
                    'HW #1', 'HW #2'
                ],
                related_projs: [
                    'Project #1',
                ],
                related_exams: [
                    'Exam #1',
                ],
                resources: [
                    'youtube.com',
                ],
            }
        ]
    },
    {
        class: 'Comp 101',
        exams: [
            {
                title: 'Exam #1',
                section_weight: '10',
                overall_weight: '10',
                related_hw: [
                    'HW #1',
                ],
                related_projs: [],
                related_exams: [],
                resources: [
                    'youtube.com',
                ]
            },
            {
                title: 'Exam #2',
                section_weight: '10',
                overall_weight: '10',
                related_hw: [
                    'HW #1', 
                    'HW #2',
                ],
                related_projs: [
                    'Project #1',
                ],
                related_exams: [
                    'Exam #1',
                ],
                resources: [
                    'youtube.com',
                ],
            },
            {
                title: 'Exam #3',
                section_weight: '10',
                overall_weight: '10',
                related_hw: [
                    'HW #1', 
                    'HW #2',
                    'HW #3',
                ],
                related_projs: [
                    'Project #1',
                    'Project #2',
                ],
                related_exams: [],
                resources: [
                    'youtube.com',
                ],
            },
        ]
    },
    {
        class: 'Nap 101',
        exams: []
    }
]

export const ProjectDataJson: ProjectData[] = [
    {
        class: 'Phil 101',
        projects: [
            {
                title: 'Project #1',
                completion: '50',
                section_weight: '33',
                overall_weight: '10',
                requirements: 'Do this thing, then that thing do another thing. Blah blah blah',
                related_homework:[ 
                    'Homework 1',
                    'Homework 2',
                    'Homework 3',
                ],
                resources: []
            }
        ]
    }
]