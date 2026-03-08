import { useState, useEffect } from "react"; 
import "./Dashboard.css";

function Dashboard() {
	const [title, setTitle] = useState("");
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState("all");

	
	useEffect(() => {
		const fetchTasks = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(
					"http://localhost:5000/api/tasks",
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				if (response.ok) {
					const data = await response.json();
					setTasks(Array.isArray(data) ? data : []);
				}
			} catch (error) {
				console.error("Erreur de chargement :", error);
			}
		};
		fetchTasks();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title.trim()) {
			alert("Le titre de la tâche est obligatoire");
			return;
		}

		const token = localStorage.getItem("token");

		try {
			const response = await fetch("http://localhost:5000/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, 
				},
				body: JSON.stringify({ title: title }),
			});

			if (response.ok) {
				const data = await response.json();

				const newTask = {
					id: data.taskId || data.id,
					title: title,
					completed: false,
				};
				setTasks([...tasks, newTask]);
				setTitle("");
			} else {
				// Si erreur 401 le token est peut-être expiré
				alert("Erreur serveur (401) : Reconnectez-vous.");
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi :", error);
		}
	};

const handleDelete = async (id) => {
	const token = localStorage.getItem("token"); 

	try {
	
		const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`, 
			},
		});

		if (response.ok) {
			
			const updatedTasks = tasks.filter((task) => task.id !== id);
			setTasks(updatedTasks);
			console.log("Tâche supprimée de la base de données !");
		} else {
			alert("Erreur lors de la suppression sur le serveur.");
		}
	} catch (error) {
		console.error("Erreur suppression :", error);
	}
};

	const handleToggle = async (id) => {
		const token = localStorage.getItem("token");
		const taskToUpdate = tasks.find((t) => t.id === id);

		try {
			const response = await fetch(
				`http://localhost:5000/api/tasks/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					
					body: JSON.stringify({
						completed: !taskToUpdate.completed,
					}),
				},
			);

			if (response.ok) {
				setTasks(
					tasks.map((task) =>
						task.id === id
							? { ...task, completed: !task.completed }
							: task,
					),
				);
			}
		} catch (error) {
			console.error("Erreur toggle :", error);
		}
	};

	const handleEdit = (id) => {
		const newTitle = prompt("Modifier le titre de la tâche :");
		if (!newTitle || !newTitle.trim()) return;

		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, title: newTitle } : task,
		);
		setTasks(updatedTasks);
	};

	const filteredTasks = tasks.filter((task) => {
		if (filter === "done") return task.completed;
		if (filter === "todo") return !task.completed;
		return true;
	});

	return (
		<div className="dashboard-page">
			<div className="dashboard-card">
				<h1>Dashboard</h1>
				<p className="subtitle">Gestion de mes tâches</p>

				<form onSubmit={handleSubmit} className="task-form">
					<input
						type="text"
						placeholder="Ajouter une tâche..."
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<button type="submit">Ajouter</button>
				</form>

				<div className="filter-box">
					<label htmlFor="filter">Filtrer :</label>
					<select
						id="filter"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value="all">Toutes</option>
						<option value="done">Terminées</option>
						<option value="todo">Non terminées</option>
					</select>
				</div>

				<div className="task-list">
					{filteredTasks.length > 0 ? (
						filteredTasks.map((task) => (
							<div key={task.id} className="task-item">
								<div className="task-info">
									<span
										className={
											task.completed
												? "task-title done"
												: "task-title"
										}
									>
										{task.title}
									</span>
								</div>

								<div className="task-actions">
									<button
										type="button"
										onClick={() => handleEdit(task.id)}
									>
										Modifier
									</button>
									<button
										type="button"
										onClick={() => handleDelete(task.id)}
									>
										Supprimer
									</button>
									<button
										type="button"
										onClick={() => handleToggle(task.id)}
									>
										{task.completed
											? "Remettre"
											: "Terminer"}
									</button>
								</div>
							</div>
						))
					) : (
						<p>Aucune tâche à afficher.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
