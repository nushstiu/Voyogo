import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-extrabold mb-3">401 — Unauthorized</h1>
                <p className="text-gray-600 mb-6">
                    Nu ești autentificat. Te rog să te loghezi pentru a continua.
                </p>

                <div className="flex gap-3 justify-center">
                    <Link
                        to="/login"
                        className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-90"
                    >
                        Mergi la Login
                    </Link>
                    <Link
                        to="/"
                        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                        Acasă
                    </Link>
                </div>
            </div>
        </div>
    );
}