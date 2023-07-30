import { useState } from "react";

// const testItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Chargers", quantity: 3, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  //functions of the state are defined in the same component the state is defined in
  function handleAddItems(item) {
    //will be used by the form component
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState(""); //for form input state
  const [quantity, setQuantity] = useState(1); //for form select

  function handleSubmit(e) {
    //e is the event object
    e.preventDefault(); //to not reload the form after submit

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value="1">1</option>       Wrong value!!*/}
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>       Too long! There's a better way using .from() */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)} //e.target is the entire input element(type, placeholder, etc.)
      />
      <button>ADD</button>{" "}
      {/*If we had put the event handler inside the button, 
      we couldn't submit the form by pressing return key while inside a form input*/}
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input"); //for <Select> Element

  //Another example of derived state: Sorting
  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  //.slice does NOT mutate the original array, while sort does.
  //localeCompare used for sorting strings

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed)); //because .packed is a boolean value, Number() is used.

  return (
    <div className="list">
      <ul>
        {/* {items.map ...    changing this to sortedItems.map ... */}
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
          //object => <Component prop={object} />
        ))}
      </ul>

      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
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

function Stats({ items }) {
  if (!items.length)
    //Early return when stats are still zero.
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentPacked = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? `You got everything! Ready to go ✈️`
          : `💼 You have ${numItems} item${
              numItems > 1 ? "s" : ""
            } on you list, and you
        already packed ${numPacked} (${percentPacked}%)`}
      </em>
    </footer>
  );
}
