"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const numberButtons = document.querySelectorAll<HTMLButtonElement>('.btn:not(.operator)');
    const operatorButtons = document.querySelectorAll<HTMLButtonElement>('.operator');
    const equalsButton = document.getElementById('equals') as HTMLButtonElement;
    const clearButton = document.getElementById('clear') as HTMLButtonElement;
    const display = document.getElementById('display') as HTMLInputElement;
    const toggleThemeButton = document.getElementById('toggle-theme') as HTMLButtonElement;

    let currentInput: string = '';
    let firstOperand: number | null = null;
    let operator: string | null = null;

    numberButtons.forEach(button => {
        button.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLButtonElement;
            if (display.value === 'Error') {
                display.value = '';
            }
            currentInput += target.value;
            display.value = currentInput;
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLButtonElement;
            if (currentInput === '' && operator === null) return;

            if (operator !== null && currentInput !== '') {
                const result = operate(firstOperand!, parseFloat(currentInput), operator);
                if (typeof result === 'string') {
                    display.value = result;
                    firstOperand = null;
                    operator = null;
                    currentInput = '';
                    return;
                } else {
                    firstOperand = result;
                    display.value = firstOperand.toString();
                    currentInput = '';
                }
            } else if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentInput = '';
            }

            operator = target.value;

            // Clear display and set new operator
            if (firstOperand !== null) {
                display.value = firstOperand + ' ' + operator + ' ';
            }
        });
    });

    equalsButton.addEventListener('click', () => {
        if (currentInput === '' || firstOperand === null || operator === null) return;

        const result = operate(firstOperand, parseFloat(currentInput), operator);
        if (typeof result === 'string') {
            display.value = result;
        } else {
            display.value = result.toString();
            currentInput = display.value;
        }
        firstOperand = null;
        operator = null;
    });

    clearButton.addEventListener('click', () => {
        display.value = '';
        currentInput = '';
        firstOperand = null;
        operator = null;
    });

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
    });

    function operate(a: number, b: number, op: string): number | string {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) return 'Error';
                return a / b;
            default:
                return 'Error';
        }
    }
});
