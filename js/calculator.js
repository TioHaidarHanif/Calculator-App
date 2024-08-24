class Calculator {
    constructor() {
        this.display = '';
        this.input = '';
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            return 'Error';
        }
        return a / b;
    }

    handleInput(input) {
        if (input === 'C') {
            this.display = '';
            this.input = '';
        } else if (input === '=') {
            this.calculate();
        } else {
            this.input += input;
            this.display = this.input;
        }
    }

    calculate() {
        try {
            this.display = eval(this.input);
            this.input = this.display.toString();
        } catch (error) {
            this.display = 'Error';
        }
    }
}