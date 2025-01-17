import mongoose from "mongoose";

const ShopkeeperSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validates 10-digit phone numbers
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    location: {
      longitude: {
        type: Number,
     
      },
      latitude: {
        type: Number,
 
      },
    },
    coupon: {
      highscoreDiscount: {
        type: Number,
        default: 0, // Default discount is 0 if not specified
      },
    },
    timing: {
      openingTime: {
        type: String,
      
      },
      closingTime: {
        type: String,
  
      },
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

// Export the schema, ensuring it only gets compiled once
export default mongoose.models.Shopkeeper ||
  mongoose.model("Shopkeeper", ShopkeeperSchema);
