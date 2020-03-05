function eval() {
    // Do not use eval!!!
    return;
}

// function expressionCalculator(s) {
//     let str = s;

//     if (str.includes('(') || str.includes(')')) {
//         if  (str.includes('(') && !str.includes(')') || !str.includes('(') && str.includes(')') || str.match(/\(/g).length !== str.match(/\)/g).length) throw new Error("ExpressionError: Brackets must be paired");
//     }
    
//     let numbers = [];
//     let operators = [];
//     let priorities = {
//         "+": 1,
//         "-": 1,
//         "*": 2,
//         "/": 2
//     }

//     str = str.replace(/\+/g, '&+&').replace(/\-/g, '&-&').replace(/\*/g, '&*&').replace(/\//g, '&/&').replace(/\(/g, '&(&').replace(/\)/g, '&)&');
//     let expr = str.split('&');


//     function calc(a = "*") {
//         for (let g = operators.length - 1; g >= 0; g--) {

//             if (priorities[operators[operators[g]]] > priorities[operators[g - 1]]) break;
//             if (priorities[operators[operators[g]]] < priorities[a]) break;

//             let operator = operators.pop(operators[operators.length - 1]);

//             if (operator === "(") break;
//             let lastNumber = +numbers.pop(numbers[numbers.length - 1]);
//             let firstNumber = +numbers.pop(numbers[numbers.length - 1]);
//             let newNumber;
            
//             if (operator === "+") newNumber = firstNumber + lastNumber;
//             if (operator === "-") newNumber = firstNumber - lastNumber;
//             if (operator === "*") newNumber = firstNumber * lastNumber;
//             if (operator === "/") {
//                 if (lastNumber === 0 || lastNumber === -0) throw new Error("TypeError: Division by zero.");
//                 newNumber = firstNumber / lastNumber;
//             }
    
//             numbers.push(newNumber);
//         }
//     }

//     for (let i = 0; i < expr.length; i++) {
//         if (expr[i] === ' ') continue;
//         if (expr[i] === '(') {
//             operators.push(expr[i]);
//         } else if (expr[i] === ')') { 
//                 calc();
//                 operators.pop(operators[operators.length - 1]);
//         } else if (!isNaN(expr[i])) {
//             numbers.push(expr[i]);
//         } else {
//             if (!(operators[operators.length - 1]) || (operators[operators.length - 1]) === "(" || priorities[expr[i]] > priorities[operators[operators.length - 1]]){
//                 operators.push(expr[i]);
//             } else {
//                     calc(expr[i]);           
//                 }
//             }
//         operators.push(expr[i]);
//     }
//     calc();
//     return numbers[0];
// }

function expressionCalculator(s) {
    let str = s;

    if (str.includes('(') || str.includes(')')) {
        if  (str.includes('(') && !str.includes(')') || !str.includes('(') && str.includes(')') || str.match(/\(/g).length !== str.match(/\)/g).length) throw new Error("ExpressionError: Brackets must be paired");
    }
    
    let numbers = [];
    let operators = [];
    let priorities = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    }

    str = str.replace(/\+/g, '&+&').replace(/\-/g, '&-&').replace(/\*/g, '&*&').replace(/\//g, '&/&').replace(/\(/g, '&(&').replace(/\)/g, '&)&');
    let expr = str.split('&');


    function calc() {
        let operator = operators.pop(operators[operators.length - 1]);
        let lastNumber = +numbers.pop(numbers[numbers.length - 1]);
        let firstNumber = +numbers.pop(numbers[numbers.length - 1]);
        let newNumber;
        
        if (operator === "+") newNumber = firstNumber + lastNumber;
        if (operator === "-") newNumber = firstNumber - lastNumber;
        if (operator === "*") newNumber = firstNumber * lastNumber;
        if (operator === "/") {
            if (lastNumber === 0 || lastNumber === -0) throw new Error("TypeError: Division by zero.");
            newNumber = firstNumber / lastNumber;
        }

        numbers.push(newNumber);
    }

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === ' ') continue;
        if (expr[i] === '(') {
            operators.push(expr[i]);
        } else if (expr[i] === ')') {
            inBrackets: for (let g = operators.length - 1; g >= 0; g--) {
                if (operators[operators.length - 1] === '(') {
                    operators.pop(g);
                    break inBrackets;
                }
                calc();
            }
        } else if (!isNaN(expr[i])) {
            numbers.push(expr[i]);
        } else {
            if (!(operators[operators.length - 1]) || (operators[operators.length - 1]) === "(" || priorities[expr[i]] > priorities[operators[operators.length - 1]]){
                operators.push(expr[i]);
            } else {
                for (let g = operators.length - 1; g >= 0; g--) {
                    if (priorities[operators[g]] >= priorities[expr[i]] && operators[operators.length - 1] !== '('){ 
                    if (!priorities[operators[g - 1]] || priorities[operators[g]] >= priorities[operators[g - 1]]) {
                        calc();
                    } else break;              
                }}
                operators.push(expr[i]);
            }
        } 
    } 
    for (let g = 0; g <= operators.length; g++) { calc() }
    return numbers[0];
}

module.exports = {
    expressionCalculator
}