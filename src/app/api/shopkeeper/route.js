import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConfig"; // Ensure you have a database connection utility
import Shopkeeper from "../../../models/Shopkeeper";

// Creates a new shopkeeper
export async function POST(req, res) {
  await dbConnect();

    try {
      const { email } = await req.json();

      const user = await Shopkeeper.findOne({ email: email})
      if (user){
        return NextResponse.json({message: "User already exists"})
      }
      const newShopkeeper = new Shopkeeper({
        email
      });
      const savedShopkeeper = await newShopkeeper.save();
      console.log("Saved shopkeeper")
      return NextResponse.json(savedShopkeeper, {status: 200});
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status:500});
    }

}


// updates a shopkeeper
export async function PUT(req, res) {
  await dbConnect();

    try {

      const { email, shopName, phoneNumber, location, coupon, timing } = await req.json();

      const User = await Shopkeeper.find({email: email})
      if (!User) {
      return NextResponse.json({message: "user not found"}, {status: 400});

      }
   
      const data = await Shopkeeper.findOneAndUpdate(
        { email }, // Filter to find the document with matching email
        { 
          $set: { 
            shopName, 
            phoneNumber, 
            location, 
            coupon, 
            timing 
          } 
        }, // Fields to update
        { new: true, runValidators: true } // Options: return updated document, run validators
      );

      console.log("Saved shopkeeper")
      return NextResponse.json(data, {status: 200});
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status:500});
    }

}
