import IconStar from '@/components/icons/Star';

import './styles.css';

export default function Rate({ rate = 0 }) {
  return (
    <div className='rate-container'>
      <IconStar percentage={rate} />
      <IconStar percentage={rate - 1} />
      <IconStar percentage={rate - 2} />
      <IconStar percentage={rate - 3} />
      <IconStar percentage={rate - 4} />
      <span className='rate-text'>({rate})</span>
    </div>
  );
}