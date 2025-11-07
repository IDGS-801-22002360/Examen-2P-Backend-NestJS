import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AddSaleDto {
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío.' })
  @IsString({ message: 'El ID del producto debe ser una cadena de texto.' })
  productId: string;

  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío.' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto.' })
  productName: string;

  @IsNotEmpty({ message: 'El precio no puede estar vacío.' })
  @IsNumber({}, { message: 'El precio debe ser un número válido.' })
  price: number;
}
