export default {
  iterative: (a, b) => {
    const output = []
    
    for (let i = a; i <= b; i++) {
      let loopResult = ''
      
      if (i % 3 === 0) {
        loopResult += 'Fizz'
      }
      
      if (i % 5 === 0) {
        loopResult += 'Buzz'
      }
  
      output.push(loopResult || i)
    }
    
    return output
  }
}
