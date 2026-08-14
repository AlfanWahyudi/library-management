import LoginForm from "@/components/specific/login/form";
import Image from "next/image";
import libraryImage from "../../public/images/library.jpg"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex p-5">
      <section className="flex-1 flex flex-col lg:max-w-3xl">
        <section className="flex-1 flex">
          <LoginForm />
        </section>
      </section>
      <section className="hidden lg:block lg:flex-1 relative">
        <Image 
          fill
          src={libraryImage} 
          alt="library background image"
          quality={70}
          style={{
            objectFit: 'cover',
            borderRadius: '.8rem',
            borderWidth: 1,
          }}
        />
      </section>
    </main>
  )
}