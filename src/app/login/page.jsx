'use client'

import { Button } from "@/components/ui/button";
import LoginForm from "@/components/specific/login/form";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      <section className="flex-1 flex flex-col m-3">
        <section className="flex-none">
          <Button>This is App Logo</Button>
        </section>
        <section className="flex-1 flex">
          <LoginForm />
        </section>
      </section>
      <section className="hidden lg:block lg:flex-1 lg:bg-amber-950">
        <h2 className="text-4xl text-center font-bold text-white">Gambar di sini</h2>
      </section>
    </main>
  )
}