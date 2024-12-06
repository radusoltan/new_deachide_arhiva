import {AppNavigation} from "@/app/ui/navigation";
import {AppFooter} from "@/app/ui/footer";
import i18nConfig from "@/app/i18nConfig";
import AppLogo from "@/app/ui/AppLogo";
import Link from "next/link";
import LanguageChanger from "@/app/ui/LanguageChanger";
import {SearchForm} from "@/app/ui/searchForm";

const getCategories = async (locale)=>{
  const result = await fetch(`${process.env.APP_URL}api/content/categories?locale=${locale}`);
  return await result.json()
}
export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}
const AppLayout = async (props)=>{
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  const {categories} = await getCategories(locale)

  return <div className="min-h-full bg-gray-50 dark:bg-gray-800 ">
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={`/${locale}`}>
          <AppLogo className="h-8"/>
        </Link>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <LanguageChanger/>
        </div>
        <div className="items-center justify-between w-auto md:order-1" id="navbar-language">
          <SearchForm/>
        </div>
      </div>
    </nav>

    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
    <AppFooter/>
  </div>
}
export default AppLayout