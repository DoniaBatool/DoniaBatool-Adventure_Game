#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";


class My_Country {
    name: string
    Army: number = 1000
    Missiles: number = 1500
    Drones: number = 2000
    Alies: string[] = ["Iran", "Yemen", "Lebanon", "Iraq"]

    constructor(name: string) {
        this.name = name
    }

    military_SuppliesIncrease() {
        let Army = this.Army + 100
        let Missiles = this.Missiles + 100
        let Drones = this.Drones + 100
        this.Missiles = Missiles
        this.Drones = Drones
        this.Army = Army
    }
    military_SuppliesDecrease() {
        let Army = this.Army - 100
        let Missiles = this.Missiles - 100
        let Drones = this.Drones - 100
        this.Missiles = Missiles
        this.Drones = Drones
        this.Army = Army
    }

    My_Allies() {
        //    let Alies=this.Alies
        //    this.Alies=Alies
        this.Army = this.Army + 500
        this.Drones = this.Drones + 300
        this.Missiles = this.Missiles + 300

    }
}

class Enemy_Country {
    name: string
    Army: number = 1000
    Missiles: number = 1500
    Drones: number = 2000


    constructor(name: string) {
        this.name = name

    }


    military_SuppliesDecrease() {

        let Army = this.Army - 100
        let Missiles = this.Missiles - 100
        let Drones = this.Drones - 100
        this.Missiles = Missiles
        this.Drones = Drones
        this.Army = Army
    }


}

let myCountry = await inquirer.prompt({
    type: "input",
    name: "countryName",
    message: "Enter Your Country Name"
})

let enemyCountry = await inquirer.prompt({
    type: "list",
    name: "OpponentCountry",
    message: "Enter Your Opponent Country Name: ",
    choices: ["Israel", "America", "India"]
})
console.log("-".repeat(50))

console.log("|".repeat(5) + "     " + chalk.bold.bgYellowBright.greenBright("WARFIELD CHALLENGE BEGINS....") + "     " + "|".repeat(5));

console.log("-".repeat(50))

console.log(`${chalk.bold.greenBright(myCountry.countryName)} VS ${chalk.bold.redBright(enemyCountry.OpponentCountry)}`)

let mCountry = new My_Country(myCountry.countryName)
let eCountry = new Enemy_Country(enemyCountry.OpponentCountry)

do {
    if (enemyCountry.OpponentCountry === "Israel" || enemyCountry.OpponentCountry === "America" || enemyCountry.OpponentCountry === "India") {
        let action = await inquirer.prompt({
            type: "list",
            name: "givenAction",
            message: "Choose an option: ",
            choices: ["Attack", "Ask for Aid", "Cease Fire..."]
        })
        if (action.givenAction === "Attack") {
            let number = Math.floor(Math.random() * 100+25)
            console.log (number)
            if (number <= 100) {
                mCountry.military_SuppliesDecrease()
                console.log(`${mCountry.name}'s Army Left : ${mCountry.Army}`)
                console.log(`Drones Left  : ${mCountry.Drones}`)
                console.log(`Missiles Left  : ${mCountry.Missiles}`)
                console.log("|".repeat(50))
            
                console.log(`${eCountry.name}'s Army Left : ${eCountry.Army}`)
                console.log(`Drones Left  : ${eCountry.Drones}`)
                console.log(`Missiles Left  : ${eCountry.Missiles}`)
                console.log(chalk.bgRedBright.bold.white("*").repeat(50))

                if (mCountry.Army <= 100) {
                    console.log(`${mCountry.name} HAS LOST ITS LAND AND NOW IT BELONGS TO ${eCountry.name} `)
                    process.exit()
                }
            }
            if (number > 100) {

                eCountry.military_SuppliesDecrease()
                console.log(`${mCountry.name}'s Army Left : ${mCountry.Army}`)
                console.log(`Drones Left  : ${mCountry.Drones}`)
                console.log(`Missiles Left  : ${mCountry.Missiles}`)
                console.log("|".repeat(50))
            
                console.log(`${eCountry.name}'s Army Left : ${eCountry.Army}`)
                console.log(`Drones Left  : ${eCountry.Drones}`)
                console.log(`Missiles Left  : ${eCountry.Missiles}`)

                console.log(chalk.bgRedBright.bold.white("*").repeat(50))

                if (eCountry.Army <= 100) {
                    console.log(`${eCountry.name} HAS LOST ITS LAND AND NOW IT BELONGS TO ${mCountry.name} `)
                    process.exit()

                }
            }
        }
        if (action.givenAction === "Ask for Aid") {
            let ask = await inquirer.prompt({
                name: "aidCountry",
                type: "list",
                message: "Want to Ask Aid From:",
                choices: ["Iran", "Yemen", "Lebanon", "Iraq"]

            })
            mCountry.My_Allies()
            console.log("#".repeat(50))
            console.log(chalk.bold.underline.yellowBright`The Aid has Arrived from ${ask.aidCountry}`)
            console.log("#".repeat(50))
            console.log(`${mCountry.name}'s Army has now become: ${mCountry.Army} men`)
            console.log(`Drones  : ${mCountry.Drones}`)
            console.log(`Missiles  : ${mCountry.Missiles}`)
        }
        if (action.givenAction === "Cease Fire...") {
            console.log("#".repeat(50))
            console.log(chalk.bold.underline.yellowBright`${mCountry.name} has announced a Cease Fire to recover up its injured Army Men`)
            console.log("#".repeat(50))
            mCountry.military_SuppliesIncrease()
            console.log(`${mCountry.name}'s Army Regained Health and now they are: ${mCountry.Army} men`)
            console.log(`More Drones Added and now they are  : ${mCountry.Drones}`)
            console.log(`More Missiles Added and now they are : ${mCountry.Missiles}`)
            console.log(chalk.italic.redBright("WAR RESUMED").repeat(9))
            console.log(chalk.bgCyanBright.redBright("READY TO ATTACK AGAIN!!!!!"))
            process.exit()
        }
    }
}
while (true)