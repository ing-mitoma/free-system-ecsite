import { z } from "zod";

const zipCodeRegex = /^\d{7}$/;
const strictEmailRegex =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const orderFormSchema = z.object({
  lastName: z.string().min(1, { message: "姓を入力してください" }),
  firstName: z.string().min(1, { message: "名を入力してください" }),

  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .regex(strictEmailRegex, {
      message: "メールアドレスの形式が正しくありません",
    }),

  zipCode: z
    .string()
    .min(1, { message: "郵便番号を入力してください" })
    .regex(zipCodeRegex, {
      message: "郵便番号はハイフンなしの7桁の数字で入力してください",
    }),

  addressLine1: z
    .string()
    .min(1, { message: "都道府県・市区町村を入力してください" }),

  addressLine2: z
    .string()
    .min(1, { message: "番地・ビル名・部屋番号を入力してください" }),
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;
