import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "Username",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			authorize: async (credentials) => {
				let user = null;

				let { username, password } = credentials;
				
				if (username === "admin" && password === "admin") {
					user = {
						id: 1,
						name: "Admin",
						email: "admin@example.com",
						image: "https://i.pravatar.cc/150?img=1",
					};
				}

				if (username === "user" && password === "user") {
					user = {
						id: 2,
						name: "User",
						email: "user@example.com",
						image: "https://i.pravatar.cc/150?img=2",
					};
				}

				return user;
			},
		}),
	],
});
