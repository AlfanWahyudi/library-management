import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <>
      <main className="min-h-screen flex">
        <section className="flex-1 flex flex-col m-3">
          <section className="flex-none">
            <Button>This is App Logo</Button>
          </section>
          <section className="flex-1 flex">
            <div className="m-auto w-full md:max-w-96">
              <h2 className="mb-10 font-bold text-xl text-center">Login to the app</h2>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Username</Label>
                    <Input
                      id="username"
                      type="username"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Button>Login</Button>
                </div>
              </form>
            </div>
          </section>
        </section>
        <section className="hidden lg:block lg:flex-1 lg:bg-amber-950">
          <h2 className="text-4xl text-center font-bold text-white">Gambar di sini</h2>
        </section>
      </main>
    </>
  )
}