
import {getUser} from "@/app/lib/dal";

const AdminLayout = async ({children})=> {
  const user = await getUser()

  return <div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-full">

    <main className="p-4 h-auto pt-20">
      {children}
    </main>
  </div>
}

export default AdminLayout