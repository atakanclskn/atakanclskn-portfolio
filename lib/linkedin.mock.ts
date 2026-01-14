import { ExperienceItem } from '../types';

// Not: LinkedIn API'si frontend üzerinden direkt erişime kapalıdır (CORS ve Auth gerektirir).
// Bu dosya, bir backend servisi LinkedIn verisini çekmiş gibi simüle eder.
// Gerçek bir senaryoda burası kendi yazdığınız bir backend endpoint'ine istek atar.

export const fetchLinkedInExperience = async (): Promise<ExperienceItem[]> => {
    // Simüle edilmiş gecikme (network request gibi hissettirmek için)
    await new Promise(resolve => setTimeout(resolve, 800));

    const data: ExperienceItem[] = [
        {
            _id: 'li-oyku',
            role: 'AI Developer',
            company: 'Öykü Lojistik',
            startDate: '2025-07',
            endDate: '2025-11',
            isCurrent: false,
            description: 'AI Development Expert working on Microsoft SQL Server and SQL integrations. Previously served as an Artificial Intelligence Intern.',
            skills: ['AI Development', 'SQL', 'MS SQL Server'],
            type: 'work'
        },
        {
            _id: 'li-outlier',
            role: 'Freelance AI Data Contributor',
            company: 'Outlier AI',
            startDate: '2024-09',
            endDate: '2025-10',
            isCurrent: false,
            description: 'Working on NLP, data validation, and annotation tasks. Applying knowledge in Python, algorithms, and backend development for AI data science fields.',
            skills: ['NLP', 'Python', 'Data Annotation'],
            type: 'work'
        },
        {
             _id: 'li-freelancer',
            role: 'Freelance Web Developer',
            company: 'Freelancer.com',
            startDate: '2017-01',
            endDate: '2025-09',
            isCurrent: false,
            description: 'Delivered front-end and back-end solutions using HTML, CSS, JavaScript, Python, and SQL. Completed tasks in bug fixing, content integration, and landing page development.',
            skills: ['HTML', 'CSS', 'Python', 'SQL'],
            type: 'work'
        },
        {
            _id: 'li-scale',
            role: 'AI Data Contributor',
            company: 'Scale AI',
            startDate: '2024-10',
            endDate: '2025-08',
            isCurrent: false,
            description: 'Contributed to AI training tasks involving text classification, data annotation, image evaluation, and NLP for large language and vision models.',
            skills: ['Computer Vision', 'NLP', 'Data Labeling'],
            type: 'work'
        },
        {
            _id: 'li-concentrix',
            role: 'Customer Support Representative',
            company: 'Concentrix',
            startDate: '2023-10',
            endDate: '2025-01',
            isCurrent: false,
            description: 'Delivered customer support for Pazarama.com. Handled critical tasks and assisted in operational processes, demonstrating reliability and problem-solving skills.',
            skills: ['Customer Experience', 'Problem Solving', 'Teamwork'],
            type: 'work'
        },
        {
            _id: 'li-edu-deu',
            role: 'B.S. Computer Science',
            company: 'Dokuz Eylul University',
            startDate: '2022-09',
            endDate: '2026-09',
            isCurrent: true,
            description: 'Focusing on backend development, machine learning, and AI. Active member of Google Developer Student Club and Computer Science Community.',
            skills: ['Backend Development', 'Machine Learning', 'Algorithms'],
            type: 'education'
        },
        {
            _id: 'li-cert-coderspace',
            role: 'Teknoloji Serisi (AI & Prompt Engineering)',
            company: 'Coderspace',
            startDate: '2025-12',
            isCurrent: false,
            description: 'Completed training series focused on AI, Machine Learning, and Prompt Engineering.',
            skills: ['AI', 'Prompt Engineering'],
            type: 'certification'
        },
        {
            _id: 'li-edu-hs',
            role: 'Industrial Automation Diploma',
            company: 'Automotive Exporters\' Association HS',
            startDate: '2017-09',
            endDate: '2021-07',
            isCurrent: false,
            description: 'Technical education focused on PLC programming, logical systems, and control systems.',
            skills: ['PLC', 'Automation', 'Electronics'],
            type: 'education'
        }
    ];

    // Sort by start date descending
    return data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
};