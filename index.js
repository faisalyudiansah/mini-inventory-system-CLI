const readline = require('readline')
const Controller = require("./controller/controller")
const { handleInvalidIdMenu, addItemMenu, updateItemMenu, deleteItemMenu } = require('./view/menu')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve))
}

(async () => {
    console.clear()
    let running = true
    while (running) {
        Controller.showMenu()
        const choice = await askQuestion("Choose menu: ")
        switch (choice) {
            case '1':
                await Controller.getList()
                break
            case '1a':
                const keySearch = await askQuestion("Please input your keyword: ")
                await Controller.getList(keySearch)
                break
            case '2':
                const id = await askQuestion("Enter product ID: ")
                try {
                    await Controller.getItemById(id)
                } catch (error) {
                    await handleInvalidIdMenu(askQuestion)
                }
                break
            case '3':
                await addItemMenu(askQuestion)
                break
            case '4':
                await updateItemMenu(askQuestion)
                break
            case '5':
                await deleteItemMenu(askQuestion)
                break
            case '0':
                Controller.exitApp()
                running = false
                break
            default:
                Controller.invalidInputMsg()
        }
    }
    rl.close()
})()