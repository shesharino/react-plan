import { useCallback } from 'react';
import Form from 'react-bootstrap/Form';

export default function EditFields({ items, setItems, activeId }) {
  const activeItem = items.find((i: Item) => i.id === activeId);
  const updateItemField = useCallback((id: number, field: string, value: string) => {
    setItems((items: Item[]) => items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }, [setItems]);

  return (<>
    <Form.Control placeholder="Edit Title" value={activeItem?.title}
      onChange={e => updateItemField(activeId, 'title', e.target.value)} />
    <Form.Control placeholder="Edit Description" value={activeItem?.description}
      onChange={e => updateItemField(activeId, 'description', e.target.value)} />
  </>);
}
