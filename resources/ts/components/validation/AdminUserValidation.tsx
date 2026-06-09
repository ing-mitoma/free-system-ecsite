import { z } from "zod";
const strictEmailRegex =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "管理者名は必須です" })
    .max(20, { message: "20文字以内で入力してください" }),
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .regex(strictEmailRegex, {
      message: "メールアドレスの形式が正しくありません",
    }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "英大文字、英小文字、数字で入力してください",
    })
    .regex(/[A-Z]/, { message: "大文字を1文字以上含めてください" })
    .regex(/[a-z]/, { message: "小文字を1文字以上含めてください" })
    .regex(/[0-9]/, { message: "数字を1文字以上含めてください" }),
});

export const editUserSchema = UserSchema.omit({
  password: true,
});

export type AddUserSchemaType = z.infer<typeof UserSchema>;
export type EditUserSchemaType = z.infer<typeof editUserSchema>;
