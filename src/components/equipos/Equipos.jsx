import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import img1 from '../../assets/9.jpg';
import img2 from '../../assets/equipo2.png';

const images = [img1, img2];

const Equipo = () => {
  return (
    <Carousel interval={2000}> {/* intervalo de cambio en milisegundos */}
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Equipo;
