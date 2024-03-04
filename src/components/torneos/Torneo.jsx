import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import img1 from '../../assets/fondo11.jpg';
import img2 from '../../assets/fondo12.jpg';
import img3 from '../../assets/fondo13.jpg';

const images = [img1, img2,img3];

const Torneo = () => {
  return (
    <Carousel interval={3000}> {/* intervalo de cambio en milisegundos */}
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

export default Torneo;
