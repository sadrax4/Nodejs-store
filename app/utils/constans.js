module.exports = {
    MongoIDPattern: /^[0-9a-fA-F]{24}$/,
    EXPIRES_IN: (new Date().getTime() + 1200000),
    USER_ROLE: [
        "USER",
        "ADMIN",
        "WRITER",
        "TEACHER",
        "SUPPLIER"
    ],
    PERMISSIONS: Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        CONTENT_MANAGER: ["course", "blog", "category", "product"],
        TEACHER: ["course", "blog"],
        SUPPLIER: ["product"],
        SUPERADMIN: ["all"],
        ALL: ["all"]
    }),
    SECRET_KEY: "960DE528DAF93E123145FF76AA43C7CCADEDB77702928ECE1E5AB13F76C40629",
    REFRESH_TOKEN: "A6BE3254EB2B86DF0AB149AC130CFAC93E7C68B7D919377997C326312008DA17"
}