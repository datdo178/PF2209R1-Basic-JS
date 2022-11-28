class Cat {
    constructor(name, weight, maxSpeed) {
        this.name = name;
        this.weight = weight;
        this.maxSpeed = maxSpeed;
    }

    say() {
        console.log(`${this.name}: Meo! Meo!`)
    }

    catchRat(rat) {
        return this.maxSpeed > rat.speed ? true : false;
    }

    eatRat(rat) {
        let isCatch = this.catchRat(rat);

        if (!isCatch) {
            console.log(`Slower than ${rat.name}. Can not catch it!`);
        } else if (!rat.isAlive) {
            console.log(`Catched ${rat.name}! However, it deaded. Do not eat.`);
        } else {
            this.weight += rat.weight;
            rat.isAlive = false;
            console.log(`Catched ${rat.name}! Eated!. ${this.name}'s weight + ${rat.weight} = ${this.weight}.`);
        }
    }
}

class Rat {
    constructor(name, weight, speed) {
        this.name = name;
        this.weight = weight;
        this.speed = speed;
        this.isAlive = true;
    }

    say() {
        console.log(`${this.name}: Chit! Chit!`);
    }
}

let rat1 = new Rat("Rat1", 1, 50);
let rat2 = new Rat("Rat2", 1.25, 60);
let rat3 = new Rat("Rat3", 1.5, 60);
let rat4 = new Rat("Rat4", 1.75, 80);
let rats = [rat1, rat2, rat3, rat4];
rat3.isAlive = false;

let cat1 = new Cat("Cat1", 5, 65);

for (let i = 0; i < rats.length; i++) { cat1.eatRat(rats[i]); }