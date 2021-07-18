import { Toaster } from 'react-hot-toast'
import Header from 'src/components/Header/Header'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster />
      <div className="flex flex-col container mx-auto my-0 sm:my-12 font-inter">
        {children}
      </div>
    </>
  )
}

export default MainLayout
