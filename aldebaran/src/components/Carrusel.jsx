import Carousel from 'react-bootstrap/Carousel';

// Importamos las 3 imágenes desde la carpeta assets
import cr7Imagen from '../assets/CR7.jpg';
import crissImagen from '../assets/CRISS.jpg';
import crisssImagen from '../assets/CRISSS.jpg';

function Carrusel() {
  return (
    <Carousel>
      {/* --- PRIMERA IMAGEN --- */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={cr7Imagen}
          alt="Cristiano Ronaldo 1"
          style={{ height: '500px', objectFit: 'contain', backgroundColor: '#1a1a1a' }}
        />
        <Carousel.Caption>
          <h3>Cristiano Ronaldo</h3>
          <p>El Bicho</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      {/* --- SEGUNDA IMAGEN --- */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={crissImagen}
          alt="Cristiano Ronaldo 2"
          style={{ height: '500px', objectFit: 'contain', backgroundColor: '#1a1a1a' }}
        />
        <Carousel.Caption>
          <h3>Cristiano Ronaldo</h3>
          <p>Siuuu</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* --- TERCERA IMAGEN --- */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={crisssImagen}
          alt="Cristiano Ronaldo 3"
          style={{ height: '500px', objectFit: 'contain', backgroundColor: '#1a1a1a' }}
        />
        <Carousel.Caption>
          <h3>Cristiano Ronaldo</h3>
          <p>El Mejor</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;