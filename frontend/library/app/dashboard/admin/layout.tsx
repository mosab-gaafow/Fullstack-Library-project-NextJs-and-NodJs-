import ToastProvider from "@/app/providers/ToastProvider"
import AdminSidebar from "../_components/AdminSidebar"
import Navbar from "../_components/Navbar"



const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>

      <div className='h-[70px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <nav>
          <Navbar/>
        </nav>

      </div>

        {/* in mobelka laga arko marabno */}
        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>

            <AdminSidebar/>
        </div>
        
        <main className='md:pl-64 pr-12 h-full mt-10 container mx-auto py-10'> 
      {children}
      <ToastProvider/>
        </main>

    </div>
  )
}

export default AdminLayout
