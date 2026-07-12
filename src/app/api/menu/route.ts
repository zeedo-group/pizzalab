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
        { _id: "1", name: "Margherita", description: "Fresh mozzarella, tomato sauce, basil", price: 12, category: "classic", popular: true },
        { _id: "2", name: "Pepperoni", description: "Classic pepperoni with mozzarella", price: 14, category: "classic", popular: true },
        { _id: "3", name: "Hawaiian", description: "Ham, pineapple, mozzarella", price: 15, category: "classic" },
        { _id: "4", name: "BBQ Chicken", description: "Grilled chicken, BBQ sauce, red onions", price: 16, category: "signature", popular: true },
        { _id: "5", name: "Truffle Mushroom", description: "Wild mushrooms, truffle oil, fontina", price: 18, category: "specialty" },
        { _id: "6", name: "Garlic Knots", description: "Freshly baked with marinara", price: 6, category: "sides" },
      ],
      { status: 200 }
    );
  }
}
