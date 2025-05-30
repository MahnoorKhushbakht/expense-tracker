import ContactPage from '../components/ContactPage'
import DashboardLayout from '../components/DashboardLayout'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Contact() {
    return (
      <>
      <div className="hidden md:flex lg:flex sm:hidden">
      <DashboardLayout>
       <ContactPage/>
      </DashboardLayout>
      </div>
       <div className="md:hidden lg:hidden sm:flex dark:bg-white bg-black">
       <Header/>
       <ContactPage/>
       <Footer/>
       </div>
       </>
    )
}
