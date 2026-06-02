import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Stack,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

interface ProductAddDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  fetchProducts: () => void;
}

export default function ProductAddDialog({
  isAddDialogOpen,
  setIsAddDialogOpen,
  fetchProducts,
}: ProductAddDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    emoji: "",
    description: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      emoji: formData.emoji,
      description: formData.description,
    };

    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => {
        if (res.ok) {
          alert("登録が完了しました。");
          fetchProducts();
          setIsAddDialogOpen(false);
          setFormData({
            id: "",
            name: "",
            price: "",
            category: "",
            emoji: "",
            description: "",
          });
        } else {
          throw new Error("登録失敗");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAddDialogOpen(true);
      });
  };
  return (
    <Dialog.Root
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      open={isAddDialogOpen}
      onOpenChange={(e) => setIsAddDialogOpen(e.open)}
    >
      <Dialog.Trigger asChild onClick={() => setIsAddDialogOpen(true)}>
        <Button colorPalette="black" size="sm" fontWeight={"bold"}>
          + 新規作成
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleAdd}>
              <Dialog.Header>
                <Dialog.Title fontWeight="black" fontSize="xl">
                  新規商品の登録
                </Dialog.Title>
                <Dialog.CloseTrigger>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4} my={4}>
                  <Field.Root>
                    <Field.Label>商品名</Field.Label>
                    <Input
                      placeholder="商品名"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>価格</Field.Label>
                    <Input
                      type="price"
                      placeholder="1000"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>カテゴリー</Field.Label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <option value="財布・小物">👛 財布・小物</option>
                      <option value="バッグ">👜 バッグ</option>
                      <option value="シューズ">👟 シューズ</option>
                      <option value="アパレル">🧥 アパレル</option>
                      <option value="アクセサリー">👓 アクセサリー</option>
                      <option value="時計">⌚ 時計</option>
                      <option value="ガジェット">🎧 ガジェット</option>
                      <option value="ステーショナリー">
                        ✏️ ステーショナリー
                      </option>
                      <option value="ライフスタイル">🥛 ライフスタイル</option>
                    </select>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>商品説明</Field.Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button type="submit" colorPalette="black" fontWeight="bold">
                  保存する
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
