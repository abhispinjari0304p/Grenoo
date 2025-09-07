export const Homeproducts = [
  {
    id: "1",
    name: "Organic Tomato",
    price: "₹30/kg",
    farmer: "Farmer Prashant",
    image: require("../assets/images/tomato.png"),
  },
  {
    id: "2",
    name: "Fresh Onions",
    price: "₹40/kg",
    farmer: "Farmer Vaibhav",
    image: require("../assets/images/onions.jpg"),
  },
  {
    id: "3",
    name: "Pure Milk",
    price: "₹55/litre",
    farmer: "Farmer Ramesh",
    image: require("../assets/images/milk.png"),
  },
  {
    id: "4",
    name: "Mango Alphonso",
    price: "₹150/dozen",
    farmer: "Farmer Shree",
    image: require("../assets/images/mango.png"),
  },
  {
    id: "5",
    name: "Fresh Potatoes",
    price: "50/dozen",
    farmer: "Farmer abhishek",
    image: {
      uri: "https://img.freepik.com/free-photo/bowl-with-potatoes-table_23-2148540418.jpg",
    },
  },
];

export type HomeProductType = {
  id: number;
  name: string;
  price: string | number;
  farmer: string;
  image: string | number;
};
