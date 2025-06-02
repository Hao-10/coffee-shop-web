import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Layout from '../components/Layout';

function ContactPage(){
    return(
        <div>
            <Navbar/>
            <Layout>
                <Contact/>
            </Layout>
            <Footer/>
        </div>
    )
}

export default ContactPage;