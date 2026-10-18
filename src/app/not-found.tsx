// Real 404 status (not a soft 404) for unknown paths.
export default function NotFound() {
  return (
    <main className="wrap" style={{ paddingBlock: 80 }}>
      <h1>Page not found</h1>
      <p><a href="/">Go to the product page</a></p>
    </main>
  );
}
