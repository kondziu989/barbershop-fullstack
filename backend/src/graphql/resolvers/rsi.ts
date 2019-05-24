export const palindrome = ({word}: {word: string}) => {
    const x = word.toLowerCase().split("").reverse().join("");
    console.log(x)
   return word.toLowerCase() === x;
}


// the initial seed
 
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
const seededRandom = (seed: number, max:number, min: number) => {
    max = max || 1;
    min = min || 0;
 
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;
 
    return min + rnd * (max - min);
}

const names:Array<String>= []

export const generate = ({seed,qtt}: {seed: number, qtt: number}) =>{
    
    for (var i = 0; i < qtt; i++) {
        const x = seededRandom(seed+i, 10, 20).toString(36).substring(2, 15);
        names.push(x);
    }
    return names
}