class Apple {
    constructor() {
        this.weight = 10;
    }

    getWeight() {
        return this.weight;
    }

    decrease() {
        if (this.weight > 0) {
            this.weight--;
        }
    }

    isEmpty() {
        return this.getWeight === 0;
    }
}

class Human {
    constructor(name, isMale, weight) {
        this.name = name;
        this.gender = isMale;
        this.weight = weight;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    isMale() {
        return this.gender;
    }

    setGender(isMale) {
        this.gender = isMale;
    }

    getWeight() {
        return this.weight;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    checkApple(apple) {
        let res = apple.getWeight();
        return res > 0;
    }

    eat(apple) {
        if (this.checkApple(apple)) {
            console.log(`Eat 1 unit of the apple`);
            apple.decrease();
            this.weight++;
        } else {
            console.log('Cannot eat. This apple has no unit left.')
        }
    }

    say(words) {
        console.log(`${this.name}: ${words}`);
    }
}

let apple1 = new Apple();
let adam = new Human('Adam', true, 60);

for (let i = 1; i < 13; i++) {
    adam.say(i);
    adam.eat(apple1);
}
