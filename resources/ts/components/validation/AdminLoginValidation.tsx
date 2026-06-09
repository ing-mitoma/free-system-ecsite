import { z } from "zod";
const strictEmailRegex =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .regex(strictEmailRegex, {
      message: "メールアドレスの形式が正しくありません",
    }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
