import SignUpBlock from "@/components/blocks/authentication/sign-up";

export default function Home() {
  return (
    <div className="font-sans">
      <main className="min-h-screen" id="main-content">
        <SignUpBlock />
      </main>
    </div>
  );
}
