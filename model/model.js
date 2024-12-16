const fetchData = require('../helper/fetchHelper')

module.exports = class Model {
    constructor(id, name, quantity, price, createdAt, updatedAt) {
        this.id = id
        this.name = name
        this.quantity = quantity
        this.price = price
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async getlist(keySearch) {
        let isLimit = true
        let url = "/items?_limit=10"
        if (keySearch) {
            url += `&q=${keySearch}`
        }
        try {
            const data = await fetchData(url, {})
            return {
                result: data.map(item => new Model(item.id, item.name, item.quantity, item.price, item.createdAt, item.updatedAt)),
                isLimit
            }
        } catch (error) {
            throw { message: error.message }
        }
    }

    async getItemById(id) {
        try {
            const data = await fetchData(`/items/${id}`, {})
            if (!data) {
                throw new Error('Item not found')
            }
            return new Model(data.id, data.name, data.quantity, data.price, data.createdAt, data.updatedAt)
        } catch (error) {
            throw { message: error.message }
        }
    }

    async addItem(name, quantity, price) {
        try {
            const getList = await this.getlist()
            const newId = getList[getList.length - 1].id + 1
            const newItemData = {
                id: newId,
                name,
                quantity: +quantity,
                price: +price,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const data = await fetchData("/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItemData)
            })
            if (!data) {
                throw new Error('Failed to add item')
            }
            return new Model(data.id, data.name, data.quantity, data.price, data.createdAt, data.updatedAt)
        } catch (error) {
            throw { message: error.message }
        }
    }

    async updateItem(id, updatedFields, method) {
        try {
            const data = await fetchData(`/items/${id}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedFields)
            })
            if (!data) {
                throw new Error('Failed to update item')
            }
            return new Model(data.id, data.name, data.quantity, data.price, data.createdAt, data.updatedAt)
        } catch (error) {
            throw { message: error.message }
        }
    }

    async deleteItem(id) {
        try {
            const data = await fetchData(`/items/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (!data) {
                throw new Error('Failed to delete item')
            }
        } catch (error) {
            throw { message: error.message }
        }
    }
}
