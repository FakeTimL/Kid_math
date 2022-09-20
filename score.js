function plus(n1, n2, carry = false) {
    var base = 50;
    var a = n1 % 10, b = n2 % 10, c = ~~(n1 / 10), d = ~~(n2 / 10);
    var res = base;
    if (carry)
        res += base / 2;
    if (a == 0)
        res -= base / 2;
    if (b == 0)
        res -= base / 2;
    if (c > 0 || d > 0)
        res += plus(c, d, a + b > 9);
    return res;
}

// Pre: n1 >= n2
function minus(n1, n2, borrow = false) {
    var base = 60;
    var a = n1 % 10, b = n2 % 10, c = ~~(n1 / 10), d = ~~(n2 / 10);
    var res = base;
    if (borrow) {
        res += base / 2;
        a--;
    }
    if (a == b)
        res -= base / 2;
    if (b == 0)
        res -= base / 2;
    if (c > 0 || d > 0)
        res += minus(c, d, a < b);
    return res;
}

// Pre: 0 < n2 < 10
function times(n1, n2, carry = 0) {
    var base = 50;
    var a = n1 % 10, c = ~~(n1 / 10);
    var res = base;
    if (a == 0)
        res -= base / 2;
    if (carry > 0)
        res += plus(a * n2, carry);
    if (c > 0)
        res += times(c, n2, ~~((a * n2 + carry) / 10));
    return res;
}

function divide(n1, n2) {
    var base = 60;
    var c = ~~(n1 / 10), a = n1 % 10 + c % n2 * 10, e = ~~(a / n2);
    var res = base;
    if (a < n2)
        res = 0;
    else if (a % n2 > 0)
        res += times(e, n2) + minus(a, e * n2);
    if (c > 0)
        res += divide(c, n2);
    return res;
}

function pow(n1) {
    var base = 50;
    return n1 > 10? base * 2: base;
}

function sqr(n1) {
    var base = 60;
    return n1 > 10? base * 2: base;
}