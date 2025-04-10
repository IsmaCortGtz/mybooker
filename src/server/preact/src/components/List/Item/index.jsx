import './styles.css';

export default function Item({ onClick, id, title, icon: Icon, checked, autoSelected, children }) {
  return (
    <div className="ListItem-component-container">
      <input
        type="checkbox"
        id={id}
        onClick={onClick}
        checked={checked}
        className={autoSelected ? "auto-selected" : ""}
      />
      <label className='ListItem-component-label' htmlFor={id}>
        { Icon && <Icon /> }
        <p className='ListItem-component-title'>{title}</p>
        {children}
      </label>
    </div>
  );
}

export function ItemGroup({ title, open, children }) {
  return (
    <details className="ItemGroup-container" open={open}>
      <summary className="ItemGroup-title">{title}</summary>
      {children}
    </details>
  );
}

export function ItemState({ icon: Icon, title, active = false }) {
  if (!Icon) return <></>;
  return (
    <Icon className={`state ${active ? 'active' : ""}`} title={title} />
  );
}

Item.Group = ItemGroup;
Item.State = ItemState;