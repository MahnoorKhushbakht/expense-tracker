import AboutPage from '../components/AboutPage'
import DashboardLayout from '../components/DashboardLayout'
import Footer from '../components/Footer'
import Header from '../components/Header'


const About= () => {
  return (
    <>
    <div className="hidden md:flex lg:flex sm:hidden">
    <DashboardLayout>
     <AboutPage/>
    </DashboardLayout>
    </div>
     <div className="md:hidden lg:hidden sm:flex dark:bg-white bg-black">
     <Header/>
     <AboutPage/>
     <Footer/>
     </div>
     </>
  )
}

export default About
