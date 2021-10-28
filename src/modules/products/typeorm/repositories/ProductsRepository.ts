import { getRepository, Repository } from 'typeorm';

import Product from '../entities/Product';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

class ProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product> {
    const productsList = await this.repository.findOne(id, {
      relations: ['user', 'category', 'product_images'],
    });

    return productsList;
  }

  public async list(): Promise<Product[]> {
    const productsList = await this.repository.find({
      relations: ['user', 'category', 'product_images'],
    });

    return productsList;
  }

  public async create({
    name,
    description,
    price,
    category_id,
    user_id,
  }: ICreateProductDTO): Promise<Product> {
    const createdProduct = this.repository.create({
      name,
      description,
      price,
      category_id,
      user_id,
    });

    await this.repository.save(createdProduct);

    return createdProduct;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ProductsRepository;
