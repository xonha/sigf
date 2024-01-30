import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function NavbarHome() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return (
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                    <Link
                        className="py-2 px-4 rounded-md no-underline bg-blue-500 hover:bg-blue-400 text-white"
                        href="/classes"
                    >
                        Turmas
                    </Link>
                    <div className="flex items-center gap-4">
                        Olá, {user.user_metadata.name}!
                        <LogoutButton />
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                <div />
                <form action="/login" method="get">
                    <button
                        formNoValidate
                        className="py-2 px-4 rounded-md no-underline bg-green-500 text-white hover:bg-btn-background-hover"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </nav>
    );
}
