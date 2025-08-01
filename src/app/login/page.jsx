'use client'

import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth-action"
import { useActionState, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { loginSchema } from "@/schemas/login-schema";
import InputControl from "@/components/form/input-control";
import { useInput } from "@/hooks/use-input";
import { useValidateSpecificSchema } from "@/hooks/use-validate-specific-schema";

//TODO: cleaning code
export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, {})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ---- username field ----
  const {
    value: usernameValue,
    didEdit: didUsernameEdited,
    handleInputBlur: handleUsernameBlur,
    handleInputChange: handleUsernameChange,
  } = useInput('')
  
  const {
    isValid: usernameIsValid,
    errors: usernameErrors,
    setErrorsState: setErrorsUsername,
  } = useValidateSpecificSchema({
    schema: loginSchema.shape['username'],
    value: usernameValue
  })

  const usernameHasError = (isSubmitted || didUsernameEdited) && !usernameIsValid

  // ---- password field ----
  const {
    value: passwordValue,
    didEdit: didPasswordEdited,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
  } = useInput('')

  const {
    isValid: passwordIsValid,
    errors: passwordErrors,
    setErrorsState: setErrorsPassword,
  } = useValidateSpecificSchema({
    schema: loginSchema.shape['password'],
    value: passwordValue
  })

  const passwordHasError = (isSubmitted || didPasswordEdited) && !passwordIsValid

  useEffect(() => {
    const usernameErrorFromServer = state?.properties?.username
    if (usernameErrorFromServer) {
      setErrorsUsername(usernameErrorFromServer.errors)
    }

    const passwordErrorFromServer = state?.properties?.password
    if (passwordErrorFromServer) {
      setErrorsPassword(passwordErrorFromServer.errors)
    }

  }, [state])

  function handleSubmit(e) {
    setIsSubmitted(true)

    if (!usernameIsValid || !passwordIsValid) {
      e.preventDefault()
    }
  }

  return (
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
                  hasError={usernameHasError}
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
                  hasError={passwordHasError}
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
  )
}