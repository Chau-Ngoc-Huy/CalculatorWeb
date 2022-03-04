class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.resultOperand = ''
        this.operation = ''
    }

    delete() {
        if (this.currentOperand === '') return
        this.currentOperand =  this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (this.resultOperand != ''){
            this.clear()
        }
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() +  number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return 
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.resultOperand = ''
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '/':
                computation = prev/current
                break
            case '*':
                computation = prev*current
                break
            case '+':
                computation = prev+current
                break
            case '-':
                computation = prev-current
                break
            default:
                return
            
        }
        this.clear()
        this.currentOperand = computation
        this.resultOperand = computation
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerNumber)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalNumber != null) {
            return integerDisplay + '.' + decimalNumber.toString()
        }
        else {
            return integerDisplay
        }
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }
    updateDisplay() {
        if (this.resultOperand != ''){
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.resultOperand)
        }
        else{
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        }
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
}) 