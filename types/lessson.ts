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
    public question: string;
    public options: Array<string>;
    public answer: string;
    public points: number;
}

export class CompletedLesson {
    public lessonId: string;
    public userId: string;
}

export class Benefit {
    public id: string;
    public title: string;
    public description: string;
    public points: number;
}