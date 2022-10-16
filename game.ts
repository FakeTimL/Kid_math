var score: number;
var target: number;
var question: Question;

var bot: QuestionBot = new QuestionBot();

function init() {
    addOption("add", [10, 99, 10, 99, 20]);
    addOption("sub", [10, 99, 10, 99, 20]);
    addOption("mul", [2, 9, 2, 9, 20]);
    addOption("div", [2, 9, 2, 9, 20]);
    addOption("pow", [2, 23, 0, 0, 10]);
    addOption("sqr", [2, 23, 0, 0, 10]);
    save();
    // bot.list.push(new QuestionType('add', 10, 99, 10, 99));
    // bot.list.push(new QuestionType('sub', 10, 99, 10, 99));
    // bot.list.push(new QuestionType('mul', 2, 9, 2, 9));
    // bot.list.push(new QuestionType('div', 2, 9, 2, 9));
    // bot.list.push(new QuestionType('pow', 2, 23));
    // bot.list.push(new QuestionType('sqr', 2, 23));
}

function start(tgt: number) {
    score = 0;
    target = tgt;
    question = bot.next();
}

function submit(answer: string) {
    if (answer == question.answer) {
        if (bot.status) {
            score += question.score;
            if (score >= target) alert("You win!")
        } else {
            let i = ~~(question.score/2);
            score += i;
            question.score -= i;
            bot.contents.unshift(question);
        }
        question = bot.next();
    } else {
        bot.status = false;
    }
}