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
				let { username, password } = credentials;

				try {
					const res = await fetch("http://localhost:8080/api/auth/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username,
							password,
						}),
					})

					
					if (!res.ok) {
						const error = await res.text();
						console.error("Login error:", error);
						return null;
					}
					
					const data = await res.json();

					if (data) {
						return {
							id: data.id,
							name: data.name,
							email: data.email,
							role: data.role,
							username: data.username,
							mobile: data.mobile,
						}
					}
				} catch (error) {
					console.log("Authentication failed:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
		  if (user) {
			token.id = user.id;
			token.name = user.name;
			token.username = user.username;
			token.email = user.email;
			token.mobile = user.mobile;
			token.role = user.role;
		  }
		  return token;
		},
		async session({ session, token }) {
		  if (session?.user) {
			session.user.id = token.id;
			session.user.name = token.name;
			session.user.username = token.username;
			session.user.email = token.email;
			session.user.mobile = token.mobile;
			session.user.role = token.role;
		  }
		  return session;
		}
	  },
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
	},
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: "/login",
	}
});
