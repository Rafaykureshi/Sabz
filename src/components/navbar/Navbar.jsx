import { Link } from 'react-router-dom'
import './Navbar.css'
import Contact from '../contact/Contact'
import Store from '../Store/Store'
import learn from '../learn/Learn'
import Home from '../home/Home'
import Logo from '../../assets/images/sabz.png'

const Navbar = () => {
  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mx-auto">
      <li className="nav-item active">
        <Link className="nav-link" to='/'>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/learn'>Learn</Link>
      </li>
      <img src={Logo}/>
      <li className="nav-item">
        <Link className="nav-link" to='/store'>Store</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/contact'>Contact Us</Link>
      </li>
    </ul>
  </div>
</nav>
{/* <div class="container-fluid nav-bar sticky-top px-4 py-2 py-lg-0">
            <nav class="navbar navbar-expand-lg navbar-light">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav mx-auto py-0">
                        <Link className="nav-item nav-link" to={'/'}> Home</Link>
                        <Link className="nav-item nav-link" to={'/learn'}>Learn</Link>
                        <img src={Logo}/>
                        <Link className="nav-item nav-link" to={'/store'}>Store</Link>
                        <Link className="nav-item nav-link" to={'/contact'}>Contact Us</Link>
                    </div>
                     <div class="team-icon d-none d-xl-flex justify-content-center me-3">
                        <a class="btn btn-square btn-light rounded-circle mx-1" href=""><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square btn-light rounded-circle mx-1" href=""><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-square btn-light rounded-circle mx-1" href=""><i class="fab fa-instagram"></i></a>
                        <a class="btn btn-square btn-light rounded-circle mx-1" href=""><i class="fab fa-linkedin-in"></i></a>
                    </div> 
                    <a href="#" class="btn btn-primary rounded-pill py-2 px-4 flex-shrink-0">Get Started</a>
                </div>
            </nav>
        </div> */}
    </>

  )
}

export default Navbar