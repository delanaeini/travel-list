import { useState } from "react";

export default function Form({ onAddItems }) {
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
