import LoginForm from "@/components/specific/login/form";
import Image from "next/image";
import libraryImage from "../../public/images/library.jpg"
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex p-5">
      <section className="flex-1 flex flex-col lg:max-w-3xl">
        <section className="flex-1 flex">
          <LoginForm />
        </section>
      </section>
      <section className="hidden lg:block lg:flex-1 relative">
        <Link title="reference: Unsplash" target="_blank" href="https://unsplash.com/photos/a-long-row-of-books-on-shelves-in-a-library--7EqDr9UE_M" rel="noopener noreferrer">
          <Image 
            fill
            src={libraryImage} 
            alt="library Image, reference from unsplash.com"
            quality={70}
            style={{
              objectFit: 'cover',
              borderRadius: '.8rem',
              borderWidth: 1,
            }}
          />
        </Link>
      </section>
    </main>
  )
}