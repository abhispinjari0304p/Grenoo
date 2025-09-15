import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Products data for seeding
const productsData = [
  {
    name: "Organic Tomato",
    price: "₹30/kg",
    farmer: "Farmer Prashant",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
    category: "vegetables",
    description: "Fresh organic tomatoes grown without pesticides",
    stock: 50,
    rating: 4.5
  },
  {
    name: "Fresh Onions",
    price: "₹40/kg",
    farmer: "Farmer Vaibhav",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg",
    category: "vegetables",
    description: "Premium quality onions, perfect for cooking",
    stock: 75,
    rating: 4.2
  },
  {
    name: "Pure Milk",
    price: "₹55/litre",
    farmer: "Farmer Ramesh",
    image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg",
    category: "dairy",
    description: "Fresh cow milk, delivered daily",
    stock: 30,
    rating: 4.8
  },
  {
    name: "Mango Alphonso",
    price: "₹150/dozen",
    farmer: "Farmer Shree",
    image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg",
    category: "fruits",
    description: "Premium Alphonso mangoes, sweet and juicy",
    stock: 25,
    rating: 4.9
  },
  {
    name: "Fresh Potatoes",
    price: "₹50/kg",
    farmer: "Farmer Abhishek",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg",
    category: "vegetables",
    description: "High quality potatoes, perfect for all dishes",
    stock: 100,
    rating: 4.3
  },
  {
    name: "Wheat Seeds",
    price: "₹120/kg",
    farmer: "Shree Farm Co.",
    image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg",
    category: "seeds",
    description: "Premium wheat seeds for farming",
    stock: 150,
    rating: 4.6
  },
  {
    name: "Fresh Carrots",
    price: "₹35/kg",
    farmer: "Farmer Rajesh",
    image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
    category: "vegetables",
    description: "Crunchy and sweet carrots, rich in vitamins",
    stock: 60,
    rating: 4.4
  },
  {
    name: "Green Apples",
    price: "₹180/kg",
    farmer: "Farmer Suresh",
    image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
    category: "fruits",
    description: "Crisp green apples, perfect for healthy snacking",
    stock: 40,
    rating: 4.7
  },
  {
    name: "Fresh Spinach",
    price: "₹25/bunch",
    farmer: "Farmer Meera",
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg",
    category: "vegetables",
    description: "Fresh spinach leaves, rich in iron and vitamins",
    stock: 35,
    rating: 4.1
  },
  {
    name: "Basmati Rice",
    price: "₹80/kg",
    farmer: "Farmer Vikram",
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
    category: "crops",
    description: "Premium basmati rice, aromatic and long grain",
    stock: 200,
    rating: 4.8
  },
  {
    name: "Fresh Bananas",
    price: "₹60/dozen",
    farmer: "Farmer Anita",
    image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg",
    category: "fruits",
    description: "Ripe bananas, perfect for breakfast and snacks",
    stock: 80,
    rating: 4.5
  },
  {
    name: "Mint Leaves",
    price: "₹15/bunch",
    farmer: "Farmer Kavita",
    image: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg",
    category: "herbs",
    description: "Fresh mint leaves for cooking and beverages",
    stock: 45,
    rating: 4.3
  }
];

// Home products data (featured products)
const homeProductsData = [
  {
    name: "Organic Tomato",
    price: "₹30/kg",
    farmer: "Farmer Prashant",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg"
  },
  {
    name: "Fresh Onions",
    price: "₹40/kg",
    farmer: "Farmer Vaibhav",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg"
  },
  {
    name: "Pure Milk",
    price: "₹55/litre",
    farmer: "Farmer Ramesh",
    image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg"
  },
  {
    name: "Mango Alphonso",
    price: "₹150/dozen",
    farmer: "Farmer Shree",
    image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg"
  },
  {
    name: "Fresh Potatoes",
    price: "₹50/kg",
    farmer: "Farmer Abhishek",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg"
  }
];

export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Seed products collection
    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];
      const docRef = doc(collection(db, "products"), `product_${i + 1}`);
      await setDoc(docRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed homeProducts collection
    for (let i = 0; i < homeProductsData.length; i++) {
      const product = homeProductsData[i];
      const docRef = doc(collection(db, "homeProducts"), `home_product_${i + 1}`);
      await setDoc(docRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    console.log("Database seeding completed successfully!");
    return { success: true, message: "Database seeded successfully!" };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, message: "Failed to seed database", error };
  }
};

export const clearDatabase = async () => {
  try {
    console.log("This function would clear the database in a real implementation");
    // Note: Firestore doesn't have a direct way to delete all documents
    // You would need to implement this by fetching all documents and deleting them individually
    return { success: true, message: "Database cleared (placeholder)" };
  } catch (error) {
    console.error("Error clearing database:", error);
    return { success: false, message: "Failed to clear database", error };
  }
};