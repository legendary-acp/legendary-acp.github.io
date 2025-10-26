export interface Project {
    name: string;
    stack: string;
    desc: string;
    chips: string[];
    metricLabel?: string;
    metricValue?: string;
    repo?: string;
};