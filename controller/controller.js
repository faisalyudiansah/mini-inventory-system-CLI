const Model = require("../model/model")
const View = require("../view/view")

let model = new Model()

module.exports = class Controller {
    static showMenu() {
        View.showMenu()
    }

    static showMenuInvalidID() {
        View.showMenuInvalidID()
    }

    static invalidInputMsg() {
        View.invalidInputMsg()
    }

    static exitApp() {
        View.exitApp()
    }

    static cancelAction() {
        View.cancelAction()
    }

    static async getList(keySearch) {
        try {
            let { result, isLimit } = await model.getlist(keySearch)
            if (keySearch && result.length === 0) throw new Error(`No item "${keySearch}" found`)
            View.getList(result, isLimit)
        } catch (error) {
            View.errorMsg(error)
        }
    }

    static async getItemById(id) {
        try {
            let item = await model.getItemById(id)
            View.getItem(item)
            return item
        } catch (error) {
            View.errorMsg(error)
            throw { message: error.message }
        }
    }

    static async addItem(name, quantity, price) {
        try {
            if (!name || !quantity || !price) {
                throw new Error("All fields are required")
            }
            if (isNaN(quantity) || isNaN(price)) {
                throw new Error("Quantity and price must be numbers")
            }
            let newItem = await model.addItem(name, quantity, price)
            View.success("add an item")
            View.getItem(newItem)
        } catch (error) {
            View.errorMsg(error)
            throw { message: error.message }
        }
    }

    static async updateItem(id, name, quantity, price, createdAt) {
        try {
            let updatedFields = {}

            updatedFields.id = id
            if (name) updatedFields.name = name
            if (quantity) updatedFields.quantity = +quantity
            if (price) updatedFields.price = +price
            updatedFields.createdAt = createdAt
            updatedFields.updatedAt = new Date()

            let updatedItem
            if (Object.keys(updatedFields).length === 4) {
                updatedItem = await model.updateItem(id, updatedFields, 'PATCH')
            } else {
                updatedItem = await model.updateItem(id, updatedFields, 'PUT')
            }

            View.success("update an item")
            View.getItem(updatedItem)
        } catch (error) {
            View.errorMsg(error)
            throw { message: error.message }
        }
    }

    static async deleteItem(id) {
        try {
            await model.deleteItem(id)
            View.success(`deleted item with id ${id}`)
        } catch (error) {
            View.errorMsg(error)
            throw { message: error.message }
        }
    }
}
