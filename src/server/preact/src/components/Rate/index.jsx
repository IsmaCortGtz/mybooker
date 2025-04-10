import { Star } from '@/components/icons';
import './styles.css';

export default function Rate({ rate = 0 }) {
  return (
    <div className='rate-container'>
      <Star percentage={rate} />
      <Star percentage={rate - 1} />
      <Star percentage={rate - 2} />
      <Star percentage={rate - 3} />
      <Star percentage={rate - 4} />
      <span className='rate-text'>({rate})</span>
    </div>
  );
}