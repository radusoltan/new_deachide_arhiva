import {LoginFormSchema} from "@/app/lib/definitions";
import {redirect} from "next/navigation";


export const login = async (state, formData) => {

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { email, password } = validatedFields.data

  const response = await fetch('/api/auth/login',{
    method: 'POST',
    body: JSON.stringify({email, password}),
  })

  if (response.ok) {
    redirect('/dashboard')
  }

}