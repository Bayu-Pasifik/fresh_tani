import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VegetableProductProps {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const VegetableProductCard: React.FC<VegetableProductProps> = ({ name, price, description, image, category }) => {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up">
      <div className="relative h-48 w-full overflow-hidden group">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
       
          <Badge className="absolute top-2 right-2 bg-green-500">
            {category}
          </Badge>
       
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">{name}</span>
          <span className="text-green-600 font-bold animate-pulse">Rp. {price.toFixed(0)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm truncate">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700 transition duration-300 transform hover:scale-105 active:scale-95 cursor-pointer">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VegetableProductCard;

