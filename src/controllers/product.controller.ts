import { Request, Response } from "express";
import db from '@/db/drizzle'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

class ProductController {
  constructor() {}

  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      await db.insert(products).values({
        name, 
        description,
        price: parseInt(price)
      })
      res.status(200).json({
        message: "Product added successfully"
      })
    } catch (error: unknown) {
      res.status(500).json({
        message: "Failed to add product, something went wrong"
      })
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const product = await db.select().from(products).where(eq(products.id, id));
      if(product.length <= 0) {
        return res.status(404).json({
          error: "No product associated with that ID"
        })
      }
      res.status(200).json(product[0])
    } catch (error: unknown) {
      res.status(500).json({ 
        error: "Failed to get product, something went wrong"
      })
    }
  }

  async getAllProducts(req: Request, res: Response) {
    const productList = await db.select().from(products);
    if(productList.length <= 0) {
      return res.status(404).json({
        error: "No product added on the list yet."
      })
    }
    res.status(200).json(productList)
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id, fields } = req.body;
      if(!fields) {
        return res.status(400).json({
          error: "Specify a fields to be updated"
        })
      }
      const product = await db.select().from(products).where(eq(products.id, id));
      if(product.length <= 0) {
        return res.status(404).json({
          error: "No product associated with that ID"
        })
      }
      
      await db.update(products)
      .set(fields)
      .where(eq(products.id, product[0].id));
      
      res.status(200).json({ message: "Product updated successfully" })
    } catch (error: unknown) {
      res.status(500).json({ 
        error: "Failed to update product, something went wrong"
      })
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await db.select().from(products).where(eq(products.id, id));
      if(product.length <= 0) {
        return res.status(404).json({
          error: "No product associated with that ID"
        })
      }
      
      await db.delete(products)
      .where(eq(products.id, product[0].id));
      
      res.status(200).json({ message: "Product deleted successfully" })
    } catch (error: unknown) {
      res.status(500).json({ 
        error: "Failed to delete product, something went wrong"
      })
    }
  }
}

export default new ProductController();
