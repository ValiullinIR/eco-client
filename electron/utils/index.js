const colors = require("colors")

colors.setTheme({
    info: "cyan",
    success: "green",
    warn: "yellow",
    error: "rred"
})

const success_message = (message) => console.log(message.success)
const info_message = (message) => console.log('[?] '+message.info)
const warning_message = (message) => console.log('[!] '+message.warn)

module.exports = {
    success_message,
    warning_message,
    info_message
}