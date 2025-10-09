const titulo: string = "Testando essa Brincadeira";

export default function Home() {
    return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1>{titulo}</h1>
      <p style={{ fontSize: '24px', color: 'green' }}>
        Olá, Mundo!.
      </p>
    </main>
  );
}
