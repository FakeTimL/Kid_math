var Question = /** @class */ (function () {
    function Question(text, answer, score) {
        this.text = text;
        this.answer = answer;
        this.score = score;
    }
    Question.rndbetween = function (min, max) {
        return ~~(Math.random() * (max - min + 1)) + min;
    };
    Question.generate = function (type, n1_min, n1_max, n2_min, n2_max) {
        if (n2_min === void 0) { n2_min = 0; }
        if (n2_max === void 0) { n2_max = 0; }
        var n1 = Question.rndbetween(n1_min, n1_max);
        var n2 = Question.rndbetween(n2_min, n2_max);
        switch (type) {
            case "add":
                return new Question("".concat(n1, " + ").concat(n2), "".concat(n1 + n2), plus(n1, n2));
            case "sub":
                return new Question("".concat(n1 + n2, " - ").concat(n2), "".concat(n1), minus(n1 + n2, n2));
            case "mul":
                return new Question("".concat(n1, " \u00D7 ").concat(n2), "".concat(n1 * n2), times(n1, n2));
            case "div":
                return new Question("".concat(n1 * n2, " \u00F7 ").concat(n2), "".concat(n1), divide(n1 * n2, n2));
            case "pow":
                return new Question("".concat(n1, "\u00B2"), "".concat(Math.pow(n1, 2)), pow(n1));
            case "sqr":
                return new Question("\u221A".concat(Math.pow(n1, 2)), "".concat(n1), sqr(n1));
            default:
                throw new Error("Unknown question type");
        }
    };
    return Question;
}());
