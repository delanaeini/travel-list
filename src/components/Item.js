export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      {/* <button onClick={onDeleteItem}>❌</button>  Wrong!!!*/}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      {/*We want the function only when the even happens */}
    </li>
  );
}
