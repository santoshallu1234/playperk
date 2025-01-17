import dbConnect from "@/utils/dbConnect"; // Ensure you have a database connection utility
import Shopkeeper from "@/models/Shopkeeper";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { shopkeeperId, shopName, phoneNumber, location, coupon, timing } = req.body;
      const newShopkeeper = new Shopkeeper({
        shopkeeperId,
        shopName,
        phoneNumber,
        location,
        coupon,
        timing,
      });
      const savedShopkeeper = await newShopkeeper.save();
      res.status(201).json(savedShopkeeper);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
