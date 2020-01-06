if (process.env.NODE_ENV === "production") {
    module.exports = require("./envProd");
} else {
    module.exports = require("./envDev");
}