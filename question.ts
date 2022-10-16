class Question {
    constructor(public text: string, public answer: string, public score: number) {}
    static rndbetween(min: number, max: number): number {
        return ~~(Math.random() * (max - min + 1)) + min;
    }
    static generate(type: string, n1_min: number, n1_max: number, n2_min: number = 0, n2_max: number = 0): Question {
        const n1 = Question.rndbetween(n1_min, n1_max);
        const n2 = Question.rndbetween(n2_min, n2_max);
        switch (type) {
            case "add":
                return new Question(`${n1} + ${n2}`, `${n1 + n2}`, plus(n1, n2));
            case "sub":
                return new Question(`${n1 + n2} - ${n2}`, `${n1}`, minus(n1 + n2, n2));
            case "mul":
                return new Question(`${n1} × ${n2}`, `${n1 * n2}`, times(n1, n2));
            case "div":
                return new Question(`${n1 * n2} ÷ ${n2}`, `${n1}`, divide(n1 * n2, n2));
            case "pow":
                return new Question(`${n1}²`, `${n1 ** 2}`, pow(n1));
            case "sqr":
                return new Question(`√${n1 ** 2}`, `${n1}`, sqr(n1));
            default:
                throw new Error("Unknown question type");
        }
    }
}

// class QuestionType {
//     constructor(public type: string, public n1_min: number, public n1_max: number, public n2_min: number = 0, public n2_max: number = 0) {}
//     next(): Question {
//         return Question.generate(this.type, this.n1_min, this.n1_max, this.n2_min, this.n2_max);
//     }
// }

class QuestionBot {
    // list: QuestionType[] = [];
    status: boolean = true;
    contents: Question[] = [];
    shuffle() {
        for (let i = this.contents.length - 1; i > 0; i--) {
            const j = ~~(Math.random() * (i + 1));
            [this.contents[i], this.contents[j]] = [this.contents[j], this.contents[i]];
        }
    }
    next(): Question {
        this.status = true;
        if (this.contents.length > 0) return this.contents.pop()!;
        return new Question("", "", 0);
        // return this.list[~~(Math.random() * this.list.length)].next();
    }
}