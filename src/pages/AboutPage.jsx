import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import Layout from "../components/Layout";

function AboutPage (){
    return(
        <div>
            <Navbar/>
            <Layout>
                <About/>
            </Layout>
            <Footer/>
        </div>
    )
}
export default AboutPage