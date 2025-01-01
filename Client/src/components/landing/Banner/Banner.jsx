import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className='main-block load-bg'>
        <div className='wrapper'>
          <div className='main-block__content'>
            <span className='saint-text'>Professional</span>
            <h1 className='main-text'>Beauty &amp; Care</h1>
            <p>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>

            <Link to='/Shop by Category'>
              <span className='btn'>Shop now</span>
            </Link>
          </div>
        </div>
        <img
          className='main-block__decor'
          src='/assets/img/main-block-decor.png'
          alt=''
        />
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};

