import { Link } from "react-router-dom";

export default function Forbidden() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-extrabold mb-3">403 — Forbidden</h1>
                <p className="text-gray-600 mb-6">
                    Nu ai permisiunea necesară pentru a accesa această pagină.
                </p>

                <div className="flex gap-3 justify-center">
                    <Link
                        to="/"
                        className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-90"
                    >
                        Înapoi acasă
                    </Link>
                </div>
            </div>
        </div>
    );
}