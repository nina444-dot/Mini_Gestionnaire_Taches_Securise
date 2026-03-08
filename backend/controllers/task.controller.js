import db from "../config/db.js";
//Create
export const createTask = async (req, res) => {
	try {
		const { title } = req.body;
		const userId = req.user.id;

		const [result] = await db.query(
			"INSERT INTO tasks (title, user_id) VALUES (?, ?)",
			[title, userId],
		);

		res.status(201).json({
			message: "Tâche créée !",
			taskId: result.insertId,
		});
	} catch (error) {
		res.status(500).json({
			message: "Erreur lors de la création",
			error: error.message,
		});
	}
};
//Read
export const getTasks = async (req, res) => {
	try {
		const userId = req.user.id;

		const [tasks] = await db.query(
			"SELECT * FROM tasks WHERE user_id = ? ",
			[userId],
		);

		res.json(tasks);
	} catch (error) {
		res.status(500).json({
			message: "Erreur lors de la récupération des tâches",
			error: error.message,
		});
	}
};

//Update
export const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { completed } = req.body;
		const userId = req.user.id;

		const [result] = await db.query(
			"UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?",
			[completed, id, userId],
		);

		if (result.affectedRows === 0) {
			return res
				.status(404)
				.json({ message: "Tâche non trouvée ou non autorisée" });
		}

		res.json({ message: "Tâche mise à jour !" });
	} catch (error) {
		res.status(500).json({
			message: "Erreur serveur",
			error: error.message,
		});
	}
};

//Delete
export const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user.id;

		const [result] = await db.query(
			"DELETE FROM tasks WHERE id = ? AND user_id = ?",
			[id, userId],
		);

		if (result.affectedRows === 0) {
			return res
				.status(404)
				.json({ message: "Tâche non trouvée ou non autorisée" });
		}

		res.json({ message: "Tâche supprimée avec succès !" });
	} catch (error) {
		res.status(500).json({
			message: "Erreur serveur",
			error: error.message,
		});
	}
};