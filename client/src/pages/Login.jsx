import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const schema = z.object({
	email: z.string().email("Email invalide"),
	password: z.string().min(6, "Minimum 6 caractères"),
});

function Login() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const res = await api.post("/auth/login", data);
			console.log(res.data);

			alert("Connexion réussie !");
			navigate("/dashboard");
		} catch (error) {
			console.error(error.response?.data || error.message);
			alert("Erreur de connexion");
		}
	};

	return (
		<div className="page auth-page">
			<div className="auth-card">
				<h1>Connexion</h1>
				<p className="subtitle">🐉</p>

				<form onSubmit={handleSubmit(onSubmit)} className="form">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							{...register("email")}
							placeholder="Email"
						/>
						{errors.email && (
							<p className="error-message">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="password">Mot de passe</label>
						<input
							id="password"
							type="password"
							{...register("password")}
							placeholder="Mot de passe..."
						/>
						{errors.password && (
							<p className="error-message">
								{errors.password.message}
							</p>
						)}
					</div>

					<button type="submit" className="btn btn-primary">
						Se connecter
					</button>
				</form>

				<p className="auth-link">
					Pas encore de compte ?{" "}
					<Link to="/register">S’inscrire</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
