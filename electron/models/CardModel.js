const { model, Schema } = require("mongoose")

const AffinajePlanSchema = new Schema({
    action: { type: String },
    date: { type: Date },
    bold: { type: Boolean, default: false }
}, { _id: false, __v: false })

const AffinajeSchema = new Schema({
    name: { stype: String },
    date: { type: Date },
    plan: [{ type: AffinajePlanSchema }]
}, { _id: false, __v: false })


const CardSchema = new Schema({
    cheese: { type: Schema.Types.ObjectId, ref: "Cheese"},
    date_of_making: { type: Date },
    date_of_first_embassy: { type: Date },
    embassy_time_per_one: { type: Number },
    elemets: [{ type: Number }],
    affinaje: [AffinajeSchema]
})

module.exports = model("Cards", CardSchema)
