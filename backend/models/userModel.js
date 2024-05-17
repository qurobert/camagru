import knex from "./knexfile.js";
import bcrypt from "bcrypt";

export default class UserModel {
    constructor() {
        // this.knex = knex('Users')
    }

    static async findOneByEmail(email) {
        return knex('Users').select('*').where('email', email).first()
    }
    static async findOneByUsername(username) {
        return knex('Users').select('*').where('username', username).first()
    }

    static async findById(id) {
        return knex('Users').select('*').where('id', id).first()
    }

    static async create(email, username, password) {
        return knex('Users').insert({
            email,
            username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            verify_email: false,
            code_verify_email: null,
            code_password_reset: null
        })
    }

    static async validate_email(email) {
        return knex('Users').where({email}).update({verify_email: true, code_verify_email: null})
    }

    static async updateEmailCode(email, code) {
        return knex('Users').where({email}).update({code_verify_email: code})
    }

    static async updatePasswordCode(email, code) {
        return knex('Users').where({email}).update({code_password_reset: code})
    }

    static async updatePassword(email, password) {
        return knex('Users').where({email}).update({password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))})
    }

    static async login(email, password) {
        const user = await knex('Users').select('*').where('email', email).first()
        if (!user) throw new Error("User not found")
        if (!bcrypt.compareSync(password, user.password)) throw new Error("Invalid password")
        return user;
    }

}
