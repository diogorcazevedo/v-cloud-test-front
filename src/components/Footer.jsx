import React from "react"


export function Footer() {

    return (
        <>
            <footer aria-labelledby="footer-heading" className="bg-gray-900 sticky bottom-0">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-800 py-2">
                        <div className="flex flex-row-reverse ...">
                        <p className="text-sm text-gray-400">Copyright &copy; 2023 Vibbraneo, Inc.</p>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}


