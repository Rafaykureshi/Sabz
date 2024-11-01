import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/navbar/Navbar'
import './App.css'
import Home from './components/home/Home'
import Learn from './components/learn/Learn'
import Store from './components/Store/Store'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

function App() {

  return (
    <>
      <h1>Muhib colab is on</h1>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/learn' element={<Learn/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
