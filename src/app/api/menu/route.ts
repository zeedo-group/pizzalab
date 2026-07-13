import { NextResponse } from "next/server";
import { getAllPizzas } from "@/lib/sanity";

export async function GET() {
  try {
    const pizzas = await getAllPizzas();
    return NextResponse.json(pizzas);
  } catch (error) {
    console.error("Menu API error:", error);
    return NextResponse.json(
      [
        { _id: "1", name: "Margherita", description: "Fresh mozzarella, tomato sauce, basil", price: 12, category: "classic", popular: true, image: "/images/pizza-closeup.jpg" },
        { _id: "2", name: "Pepperoni", description: "Classic pepperoni with mozzarella", price: 14, category: "classic", popular: true, image: "/images/pizza-pepperoni.jpg" },
        { _id: "3", name: "Garden Pizza", description: "Tomato, mushrooms, olives, basil, and mozzarella", price: 15, category: "classic", image: "/images/pizza-veg.jpg" },
        { _id: "4", name: "BBQ Chicken", description: "Grilled chicken, BBQ sauce, red onions", price: 16, category: "signature", popular: true, image: "/images/pizza-meat.jpg" },
        { _id: "5", name: "Truffle Mushroom", description: "Wild mushrooms, truffle oil, fontina", price: 18, category: "specialty", image: "/images/pizza-truffle.jpg" },
        { _id: "6", name: "Wood-Fired Pepperoni", description: "Pepperoni, mozzarella, tomato sauce, and charred crust", price: 16, category: "signature", image: "/images/wood-fire-oven.jpg" },
      ],
      { status: 200 }
    );
  }
}
