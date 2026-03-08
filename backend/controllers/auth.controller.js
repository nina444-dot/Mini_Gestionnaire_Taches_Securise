import db from "../config/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const hashedPassword = await argon2.hash(password);

		const [result] = await db.query(
			"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			[name, email, hashedPassword],
		);

		res.status(201).json({
			message: "Utilisateur créé avec succès en base de données !",
			userId: result.insertId,
		});
	} catch (error) {
		// affiche l'erreur SQL dans terminal VS Code
		console.log("Détail de l'erreur SQL :", error);

		res.status(500).json({
			message: "Erreur lors de l'inscription",
			error: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
			email,
		]);

		if (users.length === 0) {
			return res.status(401).json({ message: "Identifiants invalides" });
		}

		const user = users[0];

		
		const isPasswordValid = await argon2.verify(user.password, password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Identifiants invalides" });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET || "mon_secret_jwt", 
			{ expiresIn: "1h" },
		);

		
		res.json({
			message: "Connexion réussie !",
			token: token,
			user: { id: user.id, name: user.name, email: user.email },
		});
	} catch (error) {
		res.status(500).json({
			message: "Erreur serveur",
			error: error.message,
		});
	}
};