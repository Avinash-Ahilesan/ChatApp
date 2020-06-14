
const validate = async (schema, payload) => {
    try {
        await schema.validateAsync(payload, {abortEarly: false})
    } catch (e) {
        throw {status: 400, message: "Bad Request"}
    }
}

module.exports = {validate}