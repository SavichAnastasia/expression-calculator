function eval() {
    // Do not use eval!!!
    return;
}

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
            if (lastNumber === 0) throw new Error("TypeError: Division by zero.");
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
                calc();operators.push(expr[i]);
            }
        } 
    } 
    numbers.forEach(item => calc());
    return numbers[0];
}

    // let result;
    // let expr = s.split(' ').slice(1, -1);
 
    //  if (expr.includes('(') && expr.includes(')')) {
    //      let start = expr.indexOf('(');
    //      let end = expr.lastIndexOf(')');
    //      let str = expr.slice(start, end + 1);
    //      expr.splice(start, end - start, expressionCalculator(str));
    //  }
 
    //  if (expr.includes('/') || expr.includes('*')) {
    //      for (let i = 0; i <= expr.match(/\*|\//g).length; i++) {
    //          let index = expr.match(/\*|\//).index;
    //          if (expr.match(/\*|\//)[0] === "*") {
    //              expr = expr.splice(index - 1, 3, +expr[index - 1] * +expr[index + 1]);
    //          } else {
    //              expr = expr.splice(index - 1, 3, +expr[index - 1] / +expr[index + 1]);
    //          }
    //          expr = expr.splice(index, 1);
    //      }
    //  }
 
    //  result = +expr[0];
 
    //  for (let i = 0; i <= expr.length; i++) {
    //      if (expr[i] === "+") result += +expr[i + 1];console.log(result)
    //      if (expr[i] === "-") result -= +expr[i + 1];
    //  }
    //  console.log(result);
    //  return result;


module.exports = {
    expressionCalculator
}