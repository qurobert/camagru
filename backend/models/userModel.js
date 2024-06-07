import knex from "./knexfile.js";
import bcrypt from "bcryptjs";
import {sendMail} from "../mail/sendMail.js";
import AuthController from "../controllers/authController.js";

export default class UserModel {
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
            code_password_reset: null
        })
    }

    static async validate_email(email) {
        return knex('Users').where({email}).update({verify_email: true})
    }

    static async updatePasswordCode(email, code) {
        return knex('Users').where({email}).update({code_password_reset: code})
    }

    static async updatePassword(email, password) {
        if (!password) return
        return knex('Users').where({email}).update({password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))})
    }

    static async login(email, password) {
        const user = await knex('Users').select('*').where('email', email).first()
        if (!user) throw new Error("User not found")
        if (!bcrypt.compareSync(password, user.password)) throw new Error("Invalid password")
        if (!user.verify_email) throw new Error("Email not verified")
        return user;
    }

    static async notifyUser(userId, notificationType) {
        const user = await this.findById(userId)
        if (user.notification) {
            const text = notificationType === 'like' ? 'Your image has been liked' : 'Your image has been commented'
            await sendMail(user.email, 'Notification', text)
        }
    }

    static async updateEmail(userId, email) {
        if (!email) return
        //update email if email is not already in use
        const userExist = await knex('Users').where('email', email).first()
        if (userExist) return
        const user = await  knex('Users').where('id', userId).update({email: email, verify_email: 0})
        await AuthController.sendEmailLink(email)
        return user
    }

    static async updateUsername(userId, username) {
        if (!username) return
        const userExist = await knex('Users').where('username', username).first()
        if (userExist) return
        return knex('Users').where('id', userId).update({username})
    }

    static async updateNotification(userId, notification) {
        if (notification === undefined) return
        return knex('Users').where('id', userId).update({notification})
    }
}
