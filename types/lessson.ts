export class Lesson {
    public id?: string;
    public title: string;
    public description: string;
    public points?: number;
    public content?: string;
    public image?: string;
    public isCompleted?: boolean;
    public questions?: Array<Question>;

}

export class Question {
    question: string;
    options: Array<string>;
    answer: string;
    points: number;
}

export class CompletedLesson {
    lessonId: string;
    userId: string;
}
