import React from 'react'
import './Home.css'


const Home = () => {
  return (
    <div>
      <section id="hero" class="d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1>Sabz Khushali</h1>
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ex. Quas repellendus,
                aut itaque nulla dolore dicta error in, deleniti ex libero, fugiat consectetur excepturi
                amet deserunt voluptate nam? Tempore.</h2>
              <div class="d-flex justify-content-center justify-content-lg-start">
                <button class="btn-get-started scrollto">Get Started</button>
              </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src="assets/img/hero-img.png" class="img-fluid animated" alt="" />
            </div>
          </div>
        </div>

      </section>



    </div>
  )
}

export default Home