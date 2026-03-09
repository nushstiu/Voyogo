import { Link } from "react-router-dom";

export default function ServerError() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-extrabold mb-3">500 — Server Error</h1>
                <p className="text-gray-600 mb-6">
                    A apărut o problemă internă. Te rugăm să încerci din nou mai târziu.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-90"
                    >
                        Reîncarcă pagina
                    </button>

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