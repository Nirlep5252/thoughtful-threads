import { auth, signIn } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return (
      <form
        action={async () => {
        "use server"
        await signIn();
      }}>
        <button type="submit">Log In</button>
      </form>
    )
  }

  return (
    <div>
      <h1>Hello {session.user.name}</h1>
    </div>
  );
}
