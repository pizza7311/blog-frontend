import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full h-full justify-between">
            <Header></Header>
            <div className="flex justify-center">
            <div className="mt-[56px] w-10/12 xl:w-[800px] justify-self-center">
                {children}
            </div>
            </div>
            <div className="mt-auto">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Layout