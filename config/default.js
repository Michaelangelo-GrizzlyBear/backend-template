module.exports = {
    app: {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        greeting_response: {
            message: 'Hello',
        },
        bcrypt: {
            salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
            refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
    },
    database: {
        server: process.env.DATABASE_SERVER,
        name: process.env.DATABASE_NAME,
        uri: process.env.DATABASE_URI,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    },
}
