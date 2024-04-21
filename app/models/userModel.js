import knex from "./knexfile.js";
import bcrypt from "bcrypt";

export default class UserModel {
    constructor() {
        // this.knex = knex('Users')
    }

    static async findOne(email) {
        return knex('Users').select('*').where('email', email).first()
    }

    static async findById(id) {
        return knex('Users').select('*').where('id', id).first()
    }

    static async create(email, password) {
        return knex('Users').insert({
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            verify_email: false
        })
    }

    static async login(email, password) {
        const user = await knex('Users').select('*').where('email', email).first()
        if (!user) throw new Error("User not found")
        if (!bcrypt.compareSync(password, user.password)) throw new Error("Invalid password")
        return user;
    }

    static async verify_email(email) {
        // return knex('Users').where({email}).update({verify_email: true})
    }

}
