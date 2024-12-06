import {LoginForm} from "@/app/ui/login-form";
import ServerIntlProvider from "@/components/ServerIntlProvider";
import getIntl from "@/app/intl"
const LoginPage = async (props)=>{
  const params = await props.params
  const {locale} = params
  const intl = await getIntl(locale,"auth")
  return <ServerIntlProvider messages={intl.messages} locale={intl.locale}>
    <LoginForm />
  </ServerIntlProvider>
}

export default LoginPage