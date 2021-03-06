import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import Product from './Product';

@Entity('product_images')
class ProductImage {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  file_name: string;

  @Column('uuid')
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  // Gerando um atributo com a URL de acesso para a imagem
  @Expose({name: 'image_url'})
  public getImageUrl(): string {
    return `http://localhost:3333/files/${this.file_name}`;
  }

  constructor() {
    // Gerando um id para a entidade durante o cadastro
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export default ProductImage;
