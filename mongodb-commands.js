{
    "_id": ObjectId("615c1b8f9e1e4c1b402088f0"),
    "name": "Laptop",
    "price": 1200,
    "description": "A high-efficiency laptop.",
    "inStock": true
}


{
    "_id": ObjectId("615c1c1b9e1e4c1b402088f1"),
    "userId": "user123",
    "products": [
        {
            "productId": ObjectId("615c1b8f9e1e4c1b402088f0"),
            "quantity": 1
        },
        {
            "productId": ObjectId("615c1b9f9e1e4c1b402088f2"),
            "quantity": 2
        }
    ]
}


db.shoppingCart.aggregate([
    {
        $match: { userId: "user123" } // Replace with the actual user ID
    },
    {
        $unwind: "$products" // Deconstruct the products array
    },
    {
        $lookup: {
            from: "products", // The products collection
            localField: "products.productId", // Field from the input documents
            foreignField: "_id", // Field from the documents of the "from" collection
            as: "productDetails" // Output array field
        }
    },
    {
        $unwind: "$productDetails" // Deconstruct the productDetails array
    },
    {
        $project: {
            _id: 0,
            productId: "$products.productId",
            quantity: "$products.quantity",
            name: "$productDetails.name",
            price: "$productDetails.price",
            description: "$productDetails.description"
        }
    }
])


