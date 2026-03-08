import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	
	const token = req.headers["authorization"]?.split(" ")[1];

	if (!token) {
		return res
			.status(403)
			.json({ message: "Token manquant, accès refusé." });
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "mon_secret_jwt",
		);
		req.user = decoded; 
		next(); 
	} catch (error) {
		return res.status(401).json({ message: "Token invalide ou expiré." });
	}
};
