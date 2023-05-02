const data = require("../../data.json");
console.log(data.items[0].image)

function ItemLayout() {
  return (
    <div>
      <img src="/home/mahesh/Documents/Projects/react js/pos/src/image.jpeg" alt="image" />
    </div>
  );
}

export default ItemLayout;
