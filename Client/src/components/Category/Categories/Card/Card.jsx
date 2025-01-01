import {Link} from 'react-router-dom';

export const Card = ({ category }) => {
  const { name, image } = category;
  return (
    <Link to={`/categories`}>
      <a className='top-categories__item'>
        <img src={image} className='js-img' alt='' />
        <div className='top-categories__item-hover'>
          <h5>{name}</h5>
          <span>browse products -</span>
          <i className='icon-arrow-lg'></i>
        </div>
      </a>
    </Link>
  );
};
