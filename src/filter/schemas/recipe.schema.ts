import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'recipe', id: true, timestamps: true })
export class Recipe {
  @Prop()
  category: string;

  @Prop()
  description: string;

  //   @Prop(() => Ingredient)
  //   ingredients: Ingredient[];

  //   @Prop(() => Instruction)
  //   instructions: Instruction[];

  @Prop()
  likes: number;

  @Prop()
  name: string;

  @Prop()
  pictureUrl: string;

  @Prop()
  published: boolean;

  @Prop()
  servings: string;

  @Prop() //to-be deprecated
  sourceUrl: string;

  //   @Prop(() => Time)
  //   times: Time[];
  @Prop()
  tags: string[];

  @Prop()
  views: number;

  //Just References

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;

  // @Prop()
  // createdAt: Date;

  // @Prop()
  // updatedAt: Date;
}
export const RecipeSchema = SchemaFactory.createForClass(Recipe).index({
  name: 'text',
  description: 'text',
});
