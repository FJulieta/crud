import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ nombre, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ mensaje: "Usuario registrado" });
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ mensaje: "Credenciales inválidas" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};
