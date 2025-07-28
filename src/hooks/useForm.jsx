import { useState } from 'react';

export function useForm(initialState) {
  const [form, setForm] = useState(initialState);

  // Manipulador para campos de nível superior
  const onChangeForm = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: fieldValue });
  };

  // Manipulador para campos aninhados
  const onChangeNestedForm = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    // Função para atualizar estado aninhado
    const updateNestedState = (obj, path, val) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nestedObj = keys.reduce((acc, key) => {
        if (key.includes('[')) {
          const [arrayKey, index] = key.replace(']', '').split('[');
          if (!acc[arrayKey]) acc[arrayKey] = [];
          while (acc[arrayKey].length <= parseInt(index, 10)) acc[arrayKey].push({});
          return acc[arrayKey][parseInt(index, 10)];
        }
        return acc[key] || (acc[key] = {});
      }, { ...obj });
      nestedObj[lastKey] = val;
      return { ...obj };
    };

    setForm((prev) => updateNestedState(prev, name, fieldValue));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return { form, setForm, onChangeForm, onChangeNestedForm, resetForm };
}