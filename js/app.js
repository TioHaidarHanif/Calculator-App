document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const displayElement = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    class Calculator {
        constructor(displayElement) {
            this.displayElement = displayElement;
            this.reset();
        }

        reset() {
            this.display = '0';
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
            this.updateDisplay();
        }

        appendNumber(number) {
            if (number === '.' && this.currentOperand.includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOperation(operation) {
            if (this.currentOperand === '') return;
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }

        compute() {
            let computation;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        updateDisplay() {
            this.displayElement.textContent = this.currentOperand;
        }

        handleInput(value) {
            switch (value) {
                case 'C':
                    this.reset();
                    break;
                case '=':
                    this.compute();
                    this.updateDisplay();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    this.chooseOperation(value);
                    break;
                default:
                    this.appendNumber(value);
                    this.updateDisplay();
                    break;
            }
        }
    }

    const calculator = new Calculator(displayElement);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            calculator.handleInput(value);
        });
    });

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            navbar.classList.remove('navbar-light-mode');
            navbar.classList.add('navbar-dark-mode');
            themeToggleButton.textContent = 'Switch to Light Mode';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            navbar.classList.remove('navbar-dark-mode');
            navbar.classList.add('navbar-light-mode');
            themeToggleButton.textContent = 'Switch to Dark Mode';
        }
    });
});