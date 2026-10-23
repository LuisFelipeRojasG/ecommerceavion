import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh] px-6 text-center">
      <h1 className="text-Headline_one font-Roboto text-Dark">404</h1>
      <p className="text-Body_medium font-Open_Sans text-Light">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-4 bg-Primary text-Light px-8 py-3 text-Headline_five rounded hover:bg-Dark transition-colors"
      >
        Return to homepage
      </Link>
    </div>
  );
}

export default NotFound
