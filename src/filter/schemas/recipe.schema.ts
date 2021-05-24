import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'recipe', id: true, timestamps: true })
export class Recipe {
  @Prop()
  category: string;

  @Prop()
  description: string;

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

  @Prop()
  tags: string[];

  @Prop({ type: Number })
  likes: number;

  @Prop({ type: Number })
  views: number;

  //Just References

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;
}
export const RecipeSchema = SchemaFactory.createForClass(Recipe).index({
  name: 'text',
  description: 'text',
});
