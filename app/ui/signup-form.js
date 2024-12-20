"use client"
import { signup } from '@/app/actions/auth'
import {useActionState} from "react";
import {useFormStatus} from "react-dom";

export function SignupForm() {
  const [state, formAction] = useActionState(signup, null)
  return (
      <form action={formAction}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
        )}
        <SubmitButton />
      </form>
  )
}
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
      <button disabled={pending} type="submit">
        Sign Up
      </button>
  )
}