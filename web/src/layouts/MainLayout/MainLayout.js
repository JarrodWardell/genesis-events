import { Toaster } from 'react-hot-toast'
import Header from 'src/components/Header/Header'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster />
      <div className="flex flex-col container mx-auto my-12">{children}</div>
    </>
  )
}

export default MainLayout
