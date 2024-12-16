const Controller = require("../controller/controller")

async function handleInvalidIdMenu(askQuestion) {
    let errorHandling = true
    while (errorHandling) {
        Controller.showMenuInvalidID()
        const choice = await askQuestion("Choose menu: ")
        switch (choice) {
            case '1':
                const id = await askQuestion("Enter product ID: ")
                try {
                    await Controller.getItemById(id)
                    errorHandling = false
                } catch (error) { }
                break
            case '2':
                errorHandling = false
                console.clear()
                break
            default:
                Controller.invalidInputMsg()
                errorHandling = false
        }
    }
}

async function addItemMenu(askQuestion) {
    let addingItem = true
    while (addingItem) {
        console.log("\n")
        const name = await askQuestion("Enter item name: ")
        const quantity = await askQuestion("Enter item quantity: ")
        const price = await askQuestion("Enter item price: ")
        console.log("\n")
        try {
            await Controller.addItem(name, quantity, price)
            addingItem = false
        } catch (error) { }
    }
}

async function updateItemMenu(askQuestion) {
    let updatingItem = true
    while (updatingItem) {
        console.log("\n")
        const id = await askQuestion("Enter product ID: ")
        console.log("\n")
        let item
        try {
            item = await Controller.getItemById(id)
        } catch (error) {
            await handleInvalidIdMenu(askQuestion)
            break
        }

        const name = await askQuestion(`Enter new name (current: ${item.name}): `)
        const quantity = await askQuestion(`Enter new quantity (current: ${item.quantity}): `)
        const price = await askQuestion(`Enter new price (current: ${item.price}): `)
        console.log("\n")

        try {
            await Controller.updateItem(id, name, quantity, price, item.createdAt)
            updatingItem = false
        } catch (error) { }
    }
}

async function deleteItemMenu(askQuestion) {
    let deletingItem = true
    while (deletingItem) {
        console.log("\n")
        const id = await askQuestion("Enter product ID: ")
        console.log("\n")
        let item
        try {
            item = await Controller.getItemById(id)
        } catch (error) {
            await handleInvalidIdMenu(askQuestion)
            break
        }

        const confirm = await askQuestion(`Confirm: Are you sure want to delete this item: "${item.name}" (y/n)? `)
        switch (confirm) {
            case "y":
                try {
                    await Controller.deleteItem(item.id)
                    deletingItem = false
                } catch (error) { }
                break;
            case "n":
                Controller.cancelAction()
                deletingItem = false
                break;
            default:
                Controller.invalidInputMsg()
                deletingItem = false
        }
    }
}

module.exports = {
    handleInvalidIdMenu,
    addItemMenu,
    updateItemMenu,
    deleteItemMenu,
}