import { memo } from "react";

const List = memo(function List({ items }) {
  console.log("[ARTIFICIALLY SLOW] Rendering <List /> with " + items.length + " items");

  let startTime = performance.now();
  while (performance.now() - startTime < 500)
    return (
      <ul>
        {items.map((item) => (
          <li jey={item.id}>{item.completed ? <s>{item.text}</s> : item.text}</li>
        ))}
      </ul>
    );
});

export default List;
