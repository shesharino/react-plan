import { useCallback } from "react";
import Form from "react-bootstrap/Form";

export default function EditFields({ items, setItems, activeId }) {
  const activeItem = items.find((i: Item) => i.id === activeId);

  const updateItemField = useCallback(
    (
      id: number,
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;

      setItems((items: Item[]) =>
        items.map((item) =>
          item.id === id ? { ...item, [name]: value } : item
        )
      );
    },
    [setItems]
  );

  return (
    <>
      <Form.Control
        placeholder="Edit Title"
        name="title"
        value={activeItem?.title}
        onChange={(event) => updateItemField(activeId, event)}
      />
      <Form.Control
        placeholder="Edit Description"
        name="description"
        value={activeItem?.description}
        onChange={(event) => updateItemField(activeId, event)}
      />
    </>
  );
}
