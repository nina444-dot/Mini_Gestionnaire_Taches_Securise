import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
	const [title, setTitle] = useState("");
	const [tasks, setTasks] = useState([
		{
			id: 1,
			title: "Faire la maquette",
			completed: false,
		},
		{
			id: 2,
			title: "Faire les courses",
			completed: true,
		},
		{
			id: 3,
			title: "Chercher un stage",
			completed: false,
		},
	]);

	const [filter, setFilter] = useState("all");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!title.trim()) {
			alert("Le titre de la tâche est obligatoire");
			return;
		}

		const newTask = {
			id: Date.now(),
			title: title,
			completed: false,
		};

		setTasks([...tasks, newTask]);
		setTitle("");
	};

	const handleDelete = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	};

	const handleToggle = (id) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task,
		);
		setTasks(updatedTasks);
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
