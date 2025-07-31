'use client'

import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth-action"
import { useActionState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { loginSchema } from "@/schemas/login-schema";
import InputControl from "@/components/form/input-control";
import { useInput } from "@/hooks/use-input";
import { useValidateSpecificSchema } from "@/hooks/use-validate-spesific-schema";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, {})
  const {
    value: usernameValue,
    didEdit: didUsernameEdited,
    handleInputBlur: handleUsernameBlur,
    handleInputChange: handleUsernameChange,
  } = useInput('')

  const {
    value: passwordValue,
    didEdit: didPasswordEdited,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
  } = useInput('')

  const {
    isValid: usernameIsValid,
    errors: usernameErrors
  } = useValidateSpecificSchema({
    schema: loginSchema.shape['username'],
    value: usernameValue
  })

  const {
    isValid: passwordIsValid,
    errors: passwordErrors
  } = useValidateSpecificSchema({
    schema: loginSchema.shape['password'],
    value: passwordValue
  })

  function handleSubmit(e) {
    if (!usernameIsValid || !passwordIsValid) {
      e.preventDefault()
    }
  }

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
              <Alert className="mb-5" variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Username/Password salah</AlertTitle>
              </Alert>
              <form onSubmit={handleSubmit} action={action} noValidate>
                <div className="flex flex-col gap-6">
                  <InputControl 
                    label="Username"
                    name="username"
                    id="username"
                    type="text"
                    value={usernameValue}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameBlur}
                    hasError={didUsernameEdited && !usernameIsValid}
                    errorMsg={usernameErrors}
                  />
                  <InputControl 
                    label="Password"
                    name="password"
                    id="password"
                    type="text"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    hasError={didPasswordEdited && !passwordIsValid}
                    errorMsg={passwordErrors}
                  />
                  <Button type="submit">
                    {isPending ? 'Submitted....' : 'Login' }
                  </Button>
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