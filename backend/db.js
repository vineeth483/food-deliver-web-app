const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://cvkumarreddy2004:jXaSNVxoxlNJFkke@cluster0.cn4gmgy.mongodb.net/homebites?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");

    const db = mongoose.connection.db;

    const food_itemsData = await db.collection("food_items").find({}).toArray();
    const foodCategoryData= await db.collection("foodCategory").find({}).toArray();
    
    // if (!foodData.length || !foodCategory.length) {
    //   console.warn("⚠️ One of the collections is empty.");
    // }
    global.food_items = food_itemsData;
    global.foodCategory = foodCategoryData;
    //console.log("Food items fetched: ",global.food_items);
    // console.log("Food categories fetched: ", global.foodCategory);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = mongoDB;
