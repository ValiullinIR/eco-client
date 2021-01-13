const CardModel = require('../models/CardModel')

const basename_reply = 'card-reply-'
const basename = 'card-'

const Get = async(e) => {
    const cards = await CardModel.find({}).populate('cheese')
    console.log(cards)
    e.reply(basename_reply+"get", JSON.stringify(cards))
}

const GetOne = async(e, { _id }) => {
    const card = await CardModel.findById(_id).populate('cheese')
    console.log(card)
    e.reply(basename_reply+"get_one", JSON.stringify(card))
}

const Create = async(e, card) => {
    const _card = new CardModel(card)
    await _card.save()
    e.reply(basename_reply+"create")
}

const Update = async(e, { _id, updates }) => {
    const card = await CardModel.findByIdAndUpdate(_id, { $set: updates })
    e.reply(basename_reply+"update")
}

const Delete = async(e, { _id }) => {
    const card = await CardModel.findByIdAndDelete(_id)
    e.reply(basename_reply+"delete")
}

const Main = (e, event_name, args) => {
    console.log(`[ipcEvent]: ${basename+event_name}`)
    switch (event_name) {
        case 'get':
            Get(e)
            break;
        case 'get_one':
            GetOne(e, args)
            break;
        case 'create':
            Create(e, args)
            break;
        case 'update':
            Update(e, args)
            break;
        case 'delete':
            Delete(e, args)
            break;
        default:
            console.error(`No such event: ${event_name}`)
            break;
    }
}

module.exports = {
    Get,
    GetOne,
    Create,
    Update,
    Delete,
    Main
}