import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  Field,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description: string;
}

interface ProductEditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingProduct: Product | null;
  fetchProducts: () => void;
}

export default function ProductEditDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingProduct,
  fetchProducts,
}: ProductEditDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    emoji: "",
    description: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: String(editingProduct.id),
        name: editingProduct.name,
        price: String(editingProduct.price),
        category: editingProduct.category,
        emoji: editingProduct.emoji,
        description: editingProduct.description,
      });
    }
  }, [editingProduct]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const submitData = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      emoji: formData.emoji,
      description: formData.description,
    };

    fetch(`/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => {
        if (res.ok) {
          alert("更新が完了しました。");
          fetchProducts();
          setIsEditDialogOpen(false);
          setFormData({
            id: "",
            name: "",
            price: "",
            category: "",
            emoji: "",
            description: "",
          });
        } else {
          throw new Error("更新失敗");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsEditDialogOpen(true);
      });
  };
  return (
    <Dialog.Root
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      open={isEditDialogOpen}
      onOpenChange={(e) => setIsEditDialogOpen(e.open)}
    >
      <Dialog.Trigger
        asChild
        onClick={() => setIsEditDialogOpen(true)}
      ></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleEdit}>
              <Dialog.Header>
                <Dialog.Title fontWeight="black" fontSize="xl">
                  商品情報の編集
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
                    <Field.Label>画像</Field.Label>
                    <Input
                      type="emoji"
                      placeholder=""
                      value={formData.emoji}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emoji: e.target.value,
                        })
                      }
                      required
                    />
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
