import '../../style/Banner.scss';
import Carrousel from './Carrousel';

const Banner = () => {
    return (
        <div className='banner'>
           <h1>Crypto hunter</h1>
           <h3>Get all the info regarding your favorite Crypto Currencie</h3>
           <Carrousel />
        </div>
    )
}

export default Banner
