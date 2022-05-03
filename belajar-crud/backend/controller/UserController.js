import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUser = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({msg: "password & confirm password tidak cocok"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        res.json({msg: "Register berhasil"});
    } catch (error) {
        console.log(error);
    }
}