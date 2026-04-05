

// TODO: Add styling for centering, added error handling, and add a link to the login page
export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-[#f7f2eb] text-[#17130f]">
            <div className="relative overflow-hidden">

                <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
                    <h1 className="font-display text-4xl tracking-wide text-[#17130f] sm:text-5xl">
                        Sign Up
                    </h1>
                    <form action="/api/sign_up" method="POST" className="mt-8 flex flex-col gap-4 max-w-sm">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full rounded-full border border-[#17130f]/10 bg-white/80 px-5 py-3 text-sm font-semibold text-[#17130f] shadow-sm backdrop-blur transition focus:border-[#17130f]/30 focus:outline-none"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full rounded-full border border-[#17130f]/10 bg-white/80 px-5 py-3 text-sm font-semibold text-[#17130f] shadow-sm backdrop-blur transition focus:border-[#17130f]/30 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-full border border-[#17130f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#17130f] hover:text-[#f7f2eb]"
                        >Sign Up</button>
                    </form>
                </main>
            </div>
        </div>
    );
} 
