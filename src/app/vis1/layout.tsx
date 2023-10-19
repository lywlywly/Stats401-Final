export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {" "}
      <h1>Visualization 1</h1> {children}
    </>
  );
}
