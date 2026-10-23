import { useRouteError, Link } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center gap-4 min-h-[50vh] px-6 text-center">
      <h1 className="text-Headline_one font-Roboto text-Dark">Oops!</h1>
      <p className="text-Body_medium font-Open_Sans text-Light">Sorry, an unexpected error has occurred.</p>
      <p className="text-Body_small font-Open_Sans text-Gray">
        <i>{error?.statusText || error?.message || "Unknown error"}</i>
      </p>
      <Link
        to="/"
        className="mt-4 bg-Primary text-Light px-8 py-3 text-Headline_five rounded hover:bg-Dark transition-colors"
      >
        Return to homepage
      </Link>
    </div>
  );
}

export default ErrorPage
