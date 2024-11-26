import {
  useForm,
  SubmitHandler,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

/* 컴포넌트 호출 예시
  <ModalWithForm<User>
    isOpen={true}
    onClose={() => {}}
    onSubmit={(data: User) => {}}
    fields={[{ name: "name", label: "Name" }, { name: "email", label: "Email" }]}
    defaultValues={{ name: "John Doe", email: "" }}
  />
*/

interface Field<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  validation?: object;
}

interface ModalWithFormProps<T extends FieldValues> {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: (data: T) => void;
  children?: React.ReactNode;
  fields: Field<T>[];
  errors?: FieldErrors<T>;
  formTitle?: string;
  submitButtonText: string;
  cancelButtonText: string;
}

const ModalWithForm = <T extends FieldValues>({
  isOpen = false,
  onClose = () => {},
  onSuccess,
  children,
  fields,
  errors,
  formTitle,
  submitButtonText,
  cancelButtonText,
}: ModalWithFormProps<T>) => {
  const { register, handleSubmit, reset } = useForm<T>();

  const onSubmit: SubmitHandler<T> = (data) => {
    onSuccess(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{formTitle}</h2>
        <form onSubmit={void handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={index} className="mt-4">
              <label className="block mb-2">{field.label}</label>
              <input
                {...register(field.name, field.validation)}
                className="border rounded w-full p-2"
                placeholder={field.placeholder}
              />
              {errors?.[field.name]?.message && (
                <span style={{ color: "red" }}>
                  {errors?.[field.name]?.message as string}
                </span>
              )}
            </div>
          ))}
          {children}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 rounded mr-2"
            >
              {cancelButtonText}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
