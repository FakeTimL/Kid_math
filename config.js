var options = [
    { value: 'add', text: '加法' },
    { value: 'sub', text: '减法' },
    { value: 'mul', text: '乘法' },
    { value: 'div', text: '除法' },
    { value: 'pow', text: '平方' },
    { value: 'sqr', text: '平方根' },
];
function addOption(type, values) {
    if (type === void 0) { type = "add"; }
    if (values === void 0) { values = [0, 0, 0, 0, 0]; }
    var config = document.createElement("div");
    var select = document.createElement("select");
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].value;
        option.text = options[i].text;
        select.appendChild(option);
    }
    select.value = type;
    config.appendChild(select);
    for (var i = 0; i < 5; i++) {
        var input = document.createElement("input");
        input.type = "integers";
        input.value = values[i].toString();
        config.appendChild(input);
    }
    var change = function () {
        var type = select.value;
        var inputs = config.getElementsByTagName("input");
        for (var i = 2; i <= 3; i++) {
            inputs[i].disabled = type == "pow" || type == "sqr";
        }
    };
    change();
    select.onchange = change;
    var remove = document.createElement("button");
    remove.innerText = "删除";
    remove.onclick = function () {
        config.remove();
    };
    config.appendChild(remove);
    document.getElementById("config").appendChild(config);
}
function save() {
    var configs = document.getElementById("config").getElementsByTagName("div");
    var score = 0;
    bot.contents = [];
    for (var i = 0; i < configs.length; i++) {
        var inputs = configs[i].getElementsByTagName("input");
        var type = configs[i].getElementsByTagName("select")[0].value;
        var n1_min = parseInt(inputs[0].value);
        var n1_max = parseInt(inputs[1].value);
        var n2_min = parseInt(inputs[2].value);
        var n2_max = parseInt(inputs[3].value);
        var num = parseInt(inputs[4].value);
        for (var j = 0; j < num; j++) {
            var question = Question.generate(type, n1_min, n1_max, n2_min, n2_max);
            bot.contents.push(question);
            score += question.score;
        }
    }
    bot.shuffle();
    document.getElementById('config').style.visibility = 'hidden';
    document.getElementById("progress").innerText = '';
    document.getElementById("timestamp").innerText = "\u5F00\u59CB\u65F6\u95F4: ".concat(new Date().toLocaleString());
    start(score);
    load();
}
function load() {
    document.getElementById('question').innerText = question.text;
    document.getElementById("answer").value = "";
}
