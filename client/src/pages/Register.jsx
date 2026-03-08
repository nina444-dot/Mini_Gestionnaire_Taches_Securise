import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const schema = z
	.object({
		name: z.string().min(2, "Minimum 2 caractères"),
		email: z.string().email("Email invalide"),
		password: z.string().min(6, "Minimum 6 caractères"),
		confirmPassword: z.string().min(1, "Confirmation obligatoire"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Les mots de passe ne correspondent pas",
		path: ["confirmPassword"],
	});

function Register() {
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
			const payload = {
				name: data.name,
				email: data.email,
				password: data.password,
			};

			const res = await api.post("/auth/register", payload);
			console.log(res.data);

			alert("Vous vous êtes bien enregistré !");
			navigate("/login");
		} catch (error) {
			console.error(error.response?.data || error.message);
		}
	};

	return (
		<div className="page auth-page">
			<div className="auth-card">
				<h1>Register</h1>
				<p className="subtitle">🐉</p>

				<form onSubmit={handleSubmit(onSubmit)} className="form">
					<div className="form-group">
						<label htmlFor="name">Nom</label>
						<input
							id="name"
							type="text"
							{...register("name")}
							placeholder="Nom"
						/>
						{errors.name && (
							<p className="error-message">
								{errors.name.message}
							</p>
						)}
					</div>

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
							placeholder="Mot de passe"
						/>
						{errors.password && (
							<p className="error-message">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="confirmPassword">
							Confirmer le mot de passe
						</label>
						<input
							id="confirmPassword"
							type="password"
							{...register("confirmPassword")}
							placeholder="Confirmer mot de passe"
						/>
						{errors.confirmPassword && (
							<p className="error-message">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<button type="submit" className="btn btn-primary">
						S'inscrire
					</button>
				</form>

				<p className="auth-link">
					Déjà un compte ? <Link to="/login">Se connecter</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
