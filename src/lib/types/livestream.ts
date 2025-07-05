export interface LiveStream {
    name: string;
    category: string;
    adjustedRunningTimeString: string;
    runningTime: number;
    adjustedRunningTime: number;
    viewers: number;
    title: string;
    link: string;
    selected: boolean;
    deleted: boolean;
    filteredOut: boolean
    offline: boolean;
    note: string;
}
