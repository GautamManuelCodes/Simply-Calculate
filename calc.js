class Calculator {
    constructor(prevnum, curnum) {
        this.prevnum = prevnum;
        this.curnum = curnum;
    }

    clear() {
        this.currentOperand = "0";
        this.previousOperand = "";
        this.operation = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendnum(number) {
        if (this.currentOperand === "0") this.currentOperand = "";
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    choseop(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    mem(even) {
        if (even === "MS") {
            memval = parseFloat(this.currentOperand);
            this.currentOperand = "";
        } else if (even === "MR") {
            console.log("bum" + memval + "  " + this.currentOperand);
            this.currentOperand = memval;
            console.log("bum" + memval + "  " + this.currentOperand);
            calculator.updatedisp();
        } else if (even === "MC") {
            memval = 0;
        } else {
            console.log("M+");
            memval += parseFloat(this.currentOperand);
        }
    }

    invert() {
        let sign = -1;
        this.currentOperand = parseFloat(this.currentOperand) * sign;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case "+":
                computation = prev + curr;
                break;
            case "-":
                computation = prev - curr;
                break;
            case "X":
                computation = prev * curr;
                break;
            case "÷":
                if (parseFloat(curr) === 0 && i == 1) {
                    calcbody.classList.remove("shake1");
                    calcbody.classList.add("broken");
                    instruc2.classList.add("none");
                    instruc1.classList.remove("none");
                    main.classList.remove("background");
                    main.classList.add("backgroundnew");
                    console.log("warned you");
                    this.prevnum.innerText = "";
                    this.curnum.innerText += "436%@5@!*ssjhg2148^&%@dg2";
                    i++;
                } else if (parseFloat(curr) === 0 && i == 0) {
                    instruc2.classList.remove("none");
                    instruc.classList.add("none");
                    calcbody.classList.remove("move-up");
                    calcbody.classList.add("shake1");
                    i++;
                } else {
                    computation = prev / curr;
                }
                break;
            case "%":
                computation = (prev * curr) / 100;
                break;

            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = null;
    }

    getDisplayNumber(number) {
        const stringx = number.toString();
        const intx = parseFloat(stringx.split(".")[0]);
        const decx = stringx.split(".")[1];
        let intdisp;
        if (isNaN(intx)) {
            intdisp = "";
        } else {
            intdisp = intx.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decx != null) {
            return `${intx}.${decx}`;
        } else {
            return intdisp;
        }
    }

    updatedisp() {
        this.curnum.innerText = this.getDisplayNumber(this.currentOperand);
        this.prevnum.innerText = this.getDisplayNumber(this.previousOperand);

        if (this.operation === "" || this.operation === null) {
            this.prevnum.innerText = "";
        }

        if (this.operation != null || this.operation != "") {
            this.prevnum.innerText =
                this.prevnum.innerText + this.operation.toString();
        }
    }
}

const numb = document.querySelectorAll(".num");
const opb = document.querySelectorAll(".op");
const mem = document.querySelectorAll(".mem");

const eqlb = document.querySelector(".equal");
const invert = document.querySelector(".invert");
const harres = document.querySelector(".hard-reset");
const del = document.querySelector(".del");
const prevnum = document.querySelector(".prev");
const curnum = document.querySelector(".current");

const warn = document.querySelector(".warn");
const calcbody = document.querySelector(".wrap");
const instruc = document.querySelector(".instruc");
const instruc1 = document.querySelector(".instruc1");
const instruc2 = document.querySelector(".instruc2");
const main = document.querySelector(".main");

var i = 0;
var memval = 0;

const calculator = new Calculator(prevnum, curnum);

numb.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendnum(button.innerText);
        calculator.updatedisp();
    });
});

opb.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.choseop(button.innerText);
        calculator.updatedisp();
    });
});

mem.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.mem(button.innerText);
    });
});

eqlb.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updatedisp();
});

harres.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updatedisp();
});

del.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updatedisp();
});

invert.addEventListener("click", (button) => {
    calculator.invert();
    calculator.updatedisp();
});