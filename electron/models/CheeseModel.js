const { model, Schema } = require("mongoose")

const CheeseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false},
    card: { type: Schema.Types.ObjectId, ref: "Card" }
})

module.exports = model("Cheese", CheeseSchema)