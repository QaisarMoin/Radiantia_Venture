
import { Blogs } from '../../../components/Blog/Blogs/Blogs';
import { SectionTitle } from '../../../components/shared/SectionTitle/SectionTitle';
import blogData from '../../../data/blog/blog.json';
import { Link } from 'react-router-dom';

export const LatestNews = () => {
  const blogs = [...blogData].slice(0, 2);
  return (
    <>
      {/* <!-- BEGIN LATEST NEWS --> */}
      <section className='latest-news'>
        <div className='wrapper'>
          <SectionTitle
            subTitle='Our Blog'
            title='The Latest News At BeShop'
            body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
          />
          <Blogs blogs={blogs} />
        </div>
        <div className='latest-news__btn'>
          <Link href='/blog'>
            <a className='btn'>Read blog</a>
          </Link>
        </div>
      </section>
      {/* <!-- LATEST NEWS EOF --> */}
    </>
  );
};
