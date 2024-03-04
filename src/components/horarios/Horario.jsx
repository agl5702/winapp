import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import img1 from '../../assets/fondo10.jpg';
import img2 from '../../assets/fondo16.jpg';

const images = [img1, img2];

const Horario = () => {
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

export default Horario;
