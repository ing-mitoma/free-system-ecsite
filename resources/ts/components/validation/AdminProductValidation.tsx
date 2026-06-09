import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "名前は必須項目です" }),
  price: z
    .number({ message: "数字を入力してください" })
    .min(0, { message: "価格は0円以上にしてください" }),
  category: z.string().min(1, { message: "カテゴリを選択してください" }),
  emoji: z.string().optional().or(z.literal("")),

  description: z
    .string()
    .max(200, { message: "説明文は200文字以内で入力してください" })
    .optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
