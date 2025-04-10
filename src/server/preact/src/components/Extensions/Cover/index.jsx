import API from '@/utils/API';
import './styles.css';

export default function Cover ({ id, name = "Unknow", background, foreground, icon }) {
  const style = {};
  if (background) style.backgroundColor = background;
  if (foreground) style.color = foreground;

  return (
    <a className="Extension cover-container" title={name} style={style} href={`/extensions/${id}`}>
      {icon ? (
        <img
          src={`${API.url}/extensions/icon/${id}`}
          alt={name}
          loading="lazy"
        />
      ) : (
        name
      )}
    </a>
  );
};
