import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  views: number;

  // @Prop()
  // createdAt: Date;

  // @Prop()
  // updatedAt: Date;
}
export const RecipeSchema = SchemaFactory.createForClass(Recipe).index({
  name: 'text',
  description: 'text',
});
