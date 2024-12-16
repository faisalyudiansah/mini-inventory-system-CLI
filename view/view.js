const { setCurrency, setNumber } = require("../helper/formatter")

module.exports = class View {
    static showMenu() {
        const menu = {
            1: "GET List Products",
            "1a": "GET Products with search by name",
            2: "GET Product by ID",
            3: "Add New Product",
            4: "Update a Product",
            5: "Delete a Product",
            0: "Exit"
        }
        console.table(menu)
    }

    static showMenuInvalidID() {
        const menu = {
            1: "Reinput ID",
            2: "Back to Home",
        }
        console.table(menu)
    }

    static success(activity) {
        console.log(`Success ${activity}`)
    }

    static invalidInputMsg() {
        console.log(`Your input is invalid`)
    }

    static cancelAction() {
        console.log(`Action has been cancelled`)
    }

    static exitApp() {
        console.log(`Byeee.....`)
    }

    static getList(products, isLimit) {
        products.forEach(product => {
            console.log(`${product.id} - ${product.name} (${product.quantity})`)
        })
        isLimit && products.length === 10 ? console.log("// ...") : ""
    }

    static getItem(product) {
        console.table({
            ID: product.id,
            Name: product.name,
            Quantity: `${setNumber(product.quantity)}`,
            Price: `${setCurrency(product.price)}`,
            UpdatedAt: product.updatedAt
        })
    }

    static errorMsg(error) {
        console.log(`Error: ${error.message}`)
    }
}
