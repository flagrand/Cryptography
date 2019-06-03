class RSA {
    private primeFirst: number;
    private primeSecond: number;
    private euler: number;
    private phi: number;

    constructor() {
        this.primeFirst = this.generatePrimeNumber();
        this.primeSecond = this.generatePrimeNumber();
        this.euler = this.eulerFunction();
    }

    public generatePrimeNumber() {
        let primeNumber,
            isPrime = false;

        while (!isPrime) {
            primeNumber = Math.round(Math.random() * 1000);
            
            if (primeNumber < 2){
                continue;
            }

            isPrime = true;
            for (let i = 2; i*i <= primeNumber; i++) {
                if (primeNumber % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        return primeNumber;
    }
    public eulerFunction() {
        this.phi = (this.primeFirst - 1) * (this.primeSecond - 1);
        return this.phi;
    }
    public numbersRelativelyprime() {
        let relativelyPrime,
            isRePrime = false,
            numberA: number, numberB: number, numberC: number;

        while (!isRePrime) {
            relativelyPrime = Math.floor((Math.random() * (this.phi - 1)) + 1);
            
            if (relativelyPrime < 1 || relativelyPrime > this.phi){
                continue;
            }

            numberA = this.phi;
            numberB = relativelyPrime;
            while(numberB != 0) {
                numberC = numberA % numberB;
                numberA = numberB;
                numberB = numberC;
            }
            isRePrime = numberA === 1;
        }
        return this.Serching_D(relativelyPrime)/* + ' ' + numberA + /*' ' + numberB + ' ' + numberC*/;
    }
    private Serching_D(relativePrime: number) {
        let a0: number,
        n0: number,
        p0: number,
        p1: number,
        q: number,
        r: number,
        t: number;

        p0 = 0;
        p1 = 1;
        a0 = relativePrime;
        n0 = this.phi;

        q = Math.trunc(n0 / a0);
        r = n0 % a0;
        while(r > 0) {
            t = p0 - q * p1;
            if(t >= 0) {
                t = t % this.phi;
            }else {
                t = this.phi - ((-t) % this.phi);
            }
            p0 = p1;
            p1 = t;
            n0 = a0;
            a0 = r;
            q = Math.trunc(n0 / a0);
            r = n0 % a0;
        }
        return p1;
    }
    public
    public print() {
        console.log(this.numbersRelativelyprime());
    }
}
let tryy = new RSA;

tryy.print();
