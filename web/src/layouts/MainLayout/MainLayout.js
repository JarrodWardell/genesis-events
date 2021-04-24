import Header from 'src/components/Header/Header'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col container mx-auto my-12">{children}</div>
    </>
  )
}

export default MainLayout
