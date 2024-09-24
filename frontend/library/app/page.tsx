import Image from "next/image";
import Link from "next/link";
// import Session from "./_components/Session";

export default function Home() {
  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {/* <Session/> */}
    <h1 className="bg-green-500">Hi from Libray</h1>
    <Link href={'/api/auth/signin'}>SignIn</Link>
    <Link href={'/api/auth/signout'}>SignOut</Link>

    <Link href={'/dashboard/admin'}>Admin</Link>
    <Link href={'/dashboard/users'}>User</Link>

  </main>
  );
}
