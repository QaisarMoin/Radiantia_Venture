import { DetailBlock } from '../../../components/shared/DetailBlock/DetailBlock';
import aboutBlockinfoData from '../../../data/aboutBlockinfo/aboutBlockinfo.json';

export const AboutDetailBlock = () => {
  const detailBlocks = [...aboutBlockinfoData];
  return (
    <>
      {/* <!-- ABOUT DETAIL BLOCK --> */}
      <DetailBlock detailBlocks={detailBlocks} />
    </>
  );
};
